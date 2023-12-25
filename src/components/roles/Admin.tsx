import React from "react";

import Logo from "/public/Conseil national.png";
import { UserButton } from "@clerk/nextjs";

import Image from "next/image";
import BankCard from "../ui/BankCard";
import AncfccCard from "../ui/AncfccCard";
import SafeCard from "../ui/SafeCard";
import EtapublicCard from "../ui/EtapublicCard";
import { api } from "@/utils/api";

const Admin = () => {
  const { data } = api.admin.getAllReports.useQuery();
  return (
    <div className="h-screen bg-gradient-to-b from-[#2A6F97] to-[#61A5C2]">
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
      <div className="flex flex-col items-center justify-center md:h-96 md:flex-row md:gap-7 md:pt-44">
        <div className="pulsing-notification">
          <div className="notification-circle">
            {data?.filter((v) => v.option === "option04").length}
          </div>
          <AncfccCard link="/respond/option04" />
        </div>

        <div className="pulsing-notification">
          <div className="notification-circle">
            {data?.filter((v) => v.option === "option03").length}
          </div>
          <BankCard link="/respond/option03" />
        </div>

        <div className="pulsing-notification">
          <div className="notification-circle">
            {data?.filter((v) => v.option === "option02").length}
          </div>
          <SafeCard link="/respond/option02" />
        </div>

        <div className="pulsing-notification">
          <div className="notification-circle">
            {data?.filter((v) => v.option === "option01").length}
          </div>
          <EtapublicCard link="/respond/option01" />
        </div>
      </div>
    </div>
  );
};

export default Admin;
