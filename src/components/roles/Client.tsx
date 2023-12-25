import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "/public/Conseil national.png";
import { UserButton, UserProfile } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import BankCard from "../ui/BankCard";
import AncfccCard from "../ui/AncfccCard";
import SafeCard from "../ui/SafeCard";
import EtapublicCard from "../ui/EtapublicCard";

const Client = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-[#2A6F97] to-[#61A5C2]">
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
      <div className="mt-5 flex flex-col items-center md:flex-row md:justify-between md:px-40 ">
        <div className="flex gap-5 ">
          <Button variant="secondary" className="cursor-default">
            Créer une réclamation
          </Button>
          <Link href="/myReport">
            <Button variant="outline" className="text-white">
              Mes réclamations
            </Button>
          </Link>
        </div>
        <div className=" hidden md:flex">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center md:h-96 md:flex-row md:gap-7 md:pt-32">
        <AncfccCard link="/rec/option04" />
        <BankCard link="/rec/option03" />
        <SafeCard link="/rec/option02" />
        <EtapublicCard link="/rec/option01" />
      </div>
    </div>
  );
};

export default Client;
