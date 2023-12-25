import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import Link from "next/link";
import React from "react";
import { format } from "date-fns";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Reply from "@/components/icons/reply";
import Image from "next/image";
import Logo from "/public/Conseil national.png";
import { UserButton } from "@clerk/nextjs";
import Usericon from "@/components/icons/usericon";

const myReport = () => {
  const { data } = api.client.getAllMyReport.useQuery();

  console.log(data);
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2A6F97] to-[#61A5C2]">
      <div className="flex items-center justify-between px-7 md:justify-center">
        <div>
          <Image
            src={Logo}
            className="w-20 pt-3"
            width={500}
            height={500}
            alt="logo"
          />
        </div>
        <div className="flex md:hidden">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      <div className="mt-5 flex flex-col items-center pb-3 md:flex-row md:justify-between  md:px-40">
        <div className="flex gap-5 ">
          <Link href="/ ">
            <Button variant="outline" className=" cursor-pointer text-white">
              Créer une réclamation
            </Button>
          </Link>

          <Button variant="secondary" className="cursor-default">
            Mes réclamations
          </Button>
        </div>
        <div className=" hidden md:flex">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      <div className="mx-auto  flex max-w-5xl flex-col gap-3 rounded-2xl bg-slate-300 px-5 py-5 shadow-xl shadow-slate-900 md:px-8">
        {data?.map((info, idx) => {
          return (
            <div key={idx} className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <Card className="bg-white shadow-lg shadow-slate-600 md:my-2">
                <CardHeader>
                  <CardTitle className="rounded-lg bg-slate-300 p-2 text-center text-xl ">
                    {info.reportObjet}
                  </CardTitle>
                  <CardDescription className="font-semibold ">
                    <p className="-mt-3 rounded-b-2xl bg-gray-300 text-center">
                      {info.reportRadio === null
                        ? ""
                        : info.reportRadio + " " + ":" + " "}
                      {info.reportList} 
                      
                      <br />
                      <br />
                    </p>
                    <br />
                    {info.reportDetails}
                    <br />
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <div className="flex text-muted-foreground ">
                    <Reply className="w-5" />
                    <p className="ml-2 text-sm font-semibold">
                      {format(info.createdAt, "dd-MMM-yyyy")}
                    </p>
                  </div>
                  <div className=" font-semibold flex text-blue-900">
                    <Usericon className="w-5 "/>
                    {info.Users.fullName}</div>
                </CardFooter>
              </Card>
              {info.Respond.length === 0 ? (
                <Card className="-mt-5 mb-5 flex items-center justify-center bg-white shadow-lg shadow-slate-600 md:-mt-0 md:mb-0">
                  <CardHeader>
                    <CardTitle className="w-44 rounded-lg bg-slate-300 p-2 text-center text-base">
                      Pas de réponse
                    </CardTitle>
                  </CardHeader>
                </Card>
              ) : (
                <Card className="-mt-5 mb-5 bg-white shadow-lg shadow-slate-600 md:my-2">
                  <CardHeader>
                    <CardTitle className="rounded-lg bg-slate-300 p-2 text-center text-base">
                      Réponse
                    </CardTitle>
                    <CardDescription>
                      {info.Respond[0]?.respond}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <div className="flex text-muted-foreground">
                      <Reply className="w-5" />
                      <p className="ml-2 text-sm font-semibold">
                        {info.Respond[0] ? (
                          format(info.Respond[0].createdAt, "dd-MMM-yyyy")
                        ) : (
                          <>no date</>
                        )}
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default myReport;
