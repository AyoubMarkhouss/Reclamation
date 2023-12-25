import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Logo from "/public/Conseil national.png";
import Image from "next/image";
import Reply from "@/components/icons/reply";
import { info } from "console";
import { format } from "date-fns";

const Rec = () => {
  const router = useRouter();
  const path = router.query.id as string;
  const { data } = api.admin.getFewReports.useQuery({ label: path ?? "" });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2A6F97] to-[#61A5C2] pb-10">
      <div className="flex items-center justify-evenly ">
        <div>
          <Link href="/" className=" mt-4 flex ">
            <Button variant="outline" className="w-38 bg-white">
              Retour
            </Button>
          </Link>
        </div>
        <div className="flex ">
          <Image
            src={Logo}
            className="w-20 pt-3"
            width={500}
            height={500}
            alt="logo"
          />
        </div>
        <div className="flex"></div>
      </div>

      <div className="mx-auto flex max-w-full  flex-col gap-5 pt-10 md:grid md:max-w-6xl md:grid-cols-2 ">
        {data?.map((info, idx) => {
          return (
            <Card key={idx}>
              <CardHeader className="rounded-xl bg-blue-950 p-4">
                <CardTitle className="text-center text-xl text-white">
                  {info.reportObjet}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="rounded-b-xl bg-slate-300 text-center text-lg text-blue-950 shadow-md shadow-slate-500">
                  {info.reportList === null
                    ? ""
                    : info.reportList + " " + ":" + " "}
                  {info.reportRadio}
                </p>
                <br />
                <p className="break-words">{info.reportDetails}</p>
                <hr />
              </CardContent>
              <CardFooter className="flex items-center justify-between ">
                <div className="flex rounded-full bg-slate-300 p-2 font-semibold text-blue-950   shadow-lg shadow-slate-400">
                  {info.Users.fullName}
                </div>
                <div className="flex text-muted-foreground">
                  <Reply className="w-5" />
                  <p className="ml-2 text-sm font-semibold">
                    {format(info.createdAt, "dd-MMM-yyyy")}
                  </p>
                </div>
                <div className="flex">
                  <Link href={`/report/${info.id}`}>
                    <Button variant="outline" className="bg-white">
                      voir
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Rec;
