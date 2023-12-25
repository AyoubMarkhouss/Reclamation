import { api } from "@/utils/api";
import { useRouter } from "next/router";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import Link from "next/link";

const FormSchema = z.object({
  description: z
    .string()
    .min(10, {
      message: "description must be at least 10 characters.",
    })
    .max(160, {
      message: "description must not be longer than 30 characters.",
    }),
});
const Report = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: "",
    },
  });
  const repId = router.query.id as string;
  const { data, refetch } = api.admin.findUniqueReport.useQuery({
    id: repId ?? "",
  });
  const { mutate } = api.admin.createAnswer.useMutation({
    onSuccess: () => {
      void toast.success("done");
      void refetch();
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    repId &&
      mutate({
        description: data.description,
        label: "",
        reportId: repId,
      });
  }
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gradient-to-b from-blue-950 to-blue-800 pb-10">
      {" "}
      <div className="mx-auto w-full max-w-2xl">
        <div className="w-full">
          {" "}
          <Card className="w-full">
            <CardHeader>
             
              <CardTitle className="text-center">{data?.reportObjet}</CardTitle>
            </CardHeader>
            <CardContent className="w-full">
              <p className="break-words">{data?.reportDetails}</p>
            </CardContent>
            <CardFooter className="flex justify-end">{data?.Users.fullName}</CardFooter>
          </Card>
          {!data?.answered ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-10 space-y-6 rounded-xl bg-white p-5 "
              >
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>répondre</FormLabel>
                      <FormControl>
                        <Textarea
                          className="flex h-28 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-3">
                  <Button className="w-full" type="submit">
                    Envoyer
                  </Button>
                  <Link href="/">
                    <Button variant="outline" className="w-full bg-white">
                      Retour
                    </Button>
                  </Link>
                </div>
              </form>
            </Form>
          ) : (
            <div>
              <Card className="mt-3">
                <CardHeader>
                  <CardTitle>{data.Respond[0]?.replyLable}</CardTitle>
                  <CardDescription>{data.Respond[0]?.respond}</CardDescription>
                </CardHeader>
              </Card>

              <Link href="/" className="mt-3 flex justify-start">
                <Button variant="outline" className="w-38 bg-white">
                  Retour
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
