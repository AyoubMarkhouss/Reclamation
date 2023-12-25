import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import Logo from "/public/Conseil national.png";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignOutButton } from "@clerk/nextjs";
import { api } from "@/utils/api";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
const ConfirmAccount = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });
  const { refetch } = api.user.findUser.useQuery();
  const { mutate } = api.client.confirmMySelf.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast.success("done");
    mutate({ code: parseInt(data.username) });
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-800 text-white shadow-lg shadow-slate-600 ">
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto max-w-xl space-y-6 pt-20"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <Image
                src={Logo}
                className="w-16"
                width={500}
                height={500}
                alt="logo"
              />
              <p className="font-bold">D.R.A</p>
            </div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>code de confirmation</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Entrez le code de confirmation"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-center font-semibold">Vous recevrez un appel avec le code de confirmation</p>
            <Button className="w-full" type="submit">
              valider
            </Button>
          </form>
        </Form>
        <div className="mx-auto mt-5 max-w-xl">
          <SignOutButton>
            <Button className="w-full" variant="destructive">
              se déconnecter
            </Button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAccount;
