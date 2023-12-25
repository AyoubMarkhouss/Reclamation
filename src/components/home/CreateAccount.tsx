import React from "react";
import { api } from "@/utils/api";

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
import toast from "react-hot-toast";
import { SignOutButton } from "@clerk/nextjs";

const FormSchema = z.object({
  firstName: z.string().min(3, {
    message: "Username must be at least 2 characters.",
  }),
  lastName: z.string().min(3, {
    message: "Username must be at least 2 characters.",
  }),
  address: z.string().min(5, {
    message: "Username must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Username must be at least 2 characters.",
  }),
});
const CreateAccount = () => {
  const { refetch } = api.user.findUser.useQuery();

  const { mutate } = api.user.createUser.useMutation({
    onSuccess: () => {
      void toast.success("done");
      void refetch();
    },
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      address: "",
      firstName: "",
      phoneNumber: "",
      lastName: "",
    },
  });
  const generateRandomNumber = () => {
    const randomNumber = Math.floor(1000000 + Math.random() * 9000000); // Generates a random 7-digit number
    return randomNumber;
  };
  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate({
      address: data.address,
      fullName: `${data.lastName} ${data.firstName}`,
      phoneNumber: data.phoneNumber,
      confirmationCode: generateRandomNumber(),
    });
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-800 text-white shadow-lg shadow-slate-600 ">
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="mx-auto w-full max-w-2xl rounded-md bg-black/25 py-5 backdrop-blur-sm ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mx-auto max-w-xl space-y-3"
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
              <p className="text-center">
                veuillez vous assurer que vous entrez vos informations
                correctes.
              </p>
              <div className="grid grid-cols-2 gap-5 pt-10">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>prénom</FormLabel>
                      <FormControl>
                        <Input placeholder="prénom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>nom</FormLabel>
                      <FormControl>
                        <Input placeholder="nom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>adresse</FormLabel>
                    <FormControl>
                      <Input placeholder="adresse" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>numéro de téléphone</FormLabel>
                    <FormControl>
                      <Input placeholder="numéro de téléphone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
    </div>
  );
};

export default CreateAccount;
