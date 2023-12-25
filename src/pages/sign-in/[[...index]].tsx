/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect, useState } from "react";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Logo from "/public/Conseil national.png";
export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const user = useUser();
  useEffect(() => {
    if (user.isSignedIn) {
      router.push("/");
    }
  }, []);

  // Handle the submission of the sign-in form
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    // Start the sign-in process using the email and password provided
    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        // If complete, user exists and provided password match -- set session active
        await setActive({ session: result.createdSessionId });
        // Redirect the user to a post sign-in route
        router.push("/");
      } else {
        // The status can also be `needs_factor_on', 'needs_factor_two', or 'needs_identifier'
        // Please see https://clerk.com/docs/references/react/use-sign-in#result-status for  more information
        console.error(JSON.stringify(result, null, 2));
      }
    } catch (err: any) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error(JSON.stringify(err, null, 2));
      toast.error("wrong info");
    }
  };

  // Display a form to capture the user's email and password
  return (
    <div
      style={{ backgroundImage: `url('/1.png')` }}
      className="flex min-h-screen flex-col justify-center "
    >
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-md bg-black/25 backdrop-blur-sm">
          <form className="flex flex-col gap-5 rounded-lg px-5 py-10 text-white">
            <div className="flex flex-col items-center justify-center gap-4">
              <Image
                src={Logo}
                className="w-16"
                width={500}
                height={500}
                alt="logo"
              />
              <p className="font-bold">D.R.A</p>
              <p className="text-center font-semibold">
                Département de la relation avec les Administrations et les
                Établissements Publics, les Banques et les Assurances
              </p>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Input
                onChange={(e) => setEmailAddress(e.target.value)}
                id="email"
                placeholder="email"
                className="bg-white/10"
                name="email"
                type="email"
              />
            </div>
            <div>
              <label htmlFor="password">mot de passe</label>
              <Input
                className="bg-white/10"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="password"
                name="password"
                type="password"
              />
            </div>
            <Link href="/forget" className="text-end">
              mot de passe oublié?
            </Link>
            <Button
              variant="outline"
              className="bg-white/10"
              onClick={handleSubmit}
            >
              Se connecter
            </Button>
          </form>
          <div className="flex w-full justify-center gap-2 border-t px-3 py-4">
            <p className="text-yellow-400">Vous avez pas un compte?</p>
            <Link href="/sign-up" className="font-semibold text-white">
              s’enregistrer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
