/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { type SyntheticEvent, useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import type { NextPage } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Logo from "/public/Conseil national.png";

const SignInPage: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [complete, setComplete] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);

  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  async function create(e: SyntheticEvent) {
    e.preventDefault();
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true);
      })
      .catch((err) => console.error("error", err.errors[0].longMessage));
  }

  async function reset(e: SyntheticEvent) {
    e.preventDefault();
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        if (result.status === "needs_second_factor") {
          setSecondFactor(true);
        } else if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          setComplete(true);
        } else {
          console.log(result);
        }
      })
      .catch((err) => console.error("error", err.errors[0].longMessage));
  }

  return (
    <div style={{ backgroundImage: `url('/1.png')` }} className="min-h-screen">
      <div className="mx-auto max-w-3xl pt-10 text-white">
        <div className="rounded-md bg-black/25 px-5 py-10 backdrop-blur-sm">
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
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
            }}
            onSubmit={!successfulCreation ? create : reset}
          >
            {!successfulCreation && !complete && (
              <>
                <h1>Forgot Password ?</h1>
                <label htmlFor="email">Please provide your email</label>
                <Input
                  type="email"
                  placeholder="e.g mohammedelgad@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Button variant="outline" className="bg-white/10">
                  send confirmation code
                </Button>
              </>
            )}

            {successfulCreation && !complete && (
              <>
                <label htmlFor="password">New password</label>
                <Input
                  type="password"
                  placeholder="your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="password">
                  confirmation code been sent to your email
                </label>
                <Input
                  placeholder="check your email"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />

                <Button variant="outline" className="bg-white/10">
                  Reset
                </Button>
              </>
            )}

            {complete && "You successfully changed you password"}
            {secondFactor && "2FA is required, this UI does not handle that"}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
