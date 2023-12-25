import { api } from "@/utils/api";
import React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { UserButton } from "@clerk/nextjs";
import Logo from "/public/Conseil national.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Secretary = () => {
  const { data, refetch } = api.secretary.getAllUsers.useQuery();
  const { mutate } = api.secretary.confirmUser.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });
  return (
    <div className="min-h-screen bg-gradient-to-b  from-blue-950 to-blue-800 shadow-lg shadow-slate-600 ">
      <div className="flex items-center justify-between px-7 pt-3 md:justify-between md:px-32">
        <div className="flex"></div>
        <div>
          <Image
            src={Logo}
            className="w-20 "
            width={1500}
            height={1500}
            alt="logo"
          />
        </div>
        <div className="flex">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      <div className="my-4 flex justify-center">
        <h1 className="rounded-2xl bg-slate-300 px-5 py-3 text-2xl font-semibold md:px-10 md:text-3xl">
          Confirmation d'utilisateurs
        </h1>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 rounded-2xl bg-slate-300 p-7 md:grid-cols-2">
        {data?.map((info, idx) => {
          return (
            <Card
              key={idx}
              className="mx-2 mb-8 text-lg shadow-lg shadow-slate-600 md:mb-0 md:flex md:justify-between"
            >
              <CardContent>
                <CardTitle className="py-3 text-2xl">{info.fullName}</CardTitle>
                <p>Adresse : {info.address}</p>
                <p>Téléphone : {info.phoneNumber}</p>
                <p>
                  Code de confirmation:{" "}
                  <span className="font-bold">{info.confirmationCode}</span>
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => mutate({ clientId: info.id })}
                  className="mt-24 w-full bg-green-600"
                >
                  Confirmer
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Secretary;