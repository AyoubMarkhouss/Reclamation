/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Logo from "/public/Conseil national.png";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
export default function SignUpForm() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();

  // This function will handle the user submitting their email and password
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'verifying' true to display second form and capture the OTP code
      setPendingVerification(true);
    } catch (err: any) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error(JSON.stringify(err, null, 2));
      toast.error("Les mots de passe doivent comporter 8 caractères ou plus");
      console.log(err.errors[0].longMessage);
    }
  };

  // This function will handle the user submitting a code for verification
  const onPressVerify = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      // Submit the code that the user provides to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status !== "complete") {
        // The status can also be `abandoned` or `missing_requirements`
        // Please see https://clerk.com/docs/references/react/use-sign-up#result-status for  more information
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      // Check the status to see if it is complete
      // If complete, the user has been created -- set the session active
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        // Redirect the user to a post sign-up route
        router.push("/");
      }
    } catch (err: any) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };
  const { isSignedIn } = useUser();
  useEffect(() => {
    if (isSignedIn) {
      router.push("/");
    }
  }, []);

  return (
    <div>
      {!pendingVerification && (
        <div
          style={{ backgroundImage: `url('/1.png')` }}
          className="flex min-h-screen flex-col justify-center"
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
                  <label htmlFor="password">Mot de passe</label>
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    placeholder="password"
                    className="bg-white/10"
                    type="password"
                  />
                </div>
                <Button
                  variant="outline"
                  className="bg-white/10"
                  onClick={handleSubmit}
                >
                  S’enregistrer
                </Button>
              </form>
              <div className="flex w-full justify-center gap-2 border-t px-3 py-4">
                <p className="text-yellow-400">Vous avez déja un compte?</p>
                <Link href="/sign-in" className="font-semibold text-white">
                  Se connecter
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {pendingVerification && (
        <div
          style={{ backgroundImage: `url('/1.png')` }}
          className="min-h-screen"
        >
          <div className="mx-auto max-w-md flex items-center  h-screen">
            <form>
              <div className="rounded-md bg-black/25 py-10 backdrop-blur-sm">
                <div className="flex flex-col items-center justify-center gap-4">
                  <Image
                    src={Logo}
                    className="w-16"
                    width={500}
                    height={500}
                    alt="logo"
                  />
                  <p className="mb-5 font-bold text-white">D.R.A</p>
                </div>
                <div className="px-5">
                  <p className="text-white text-justify py-5">
                    Veuillez vérifier votre boite d'e-mail pour un message
                    contenant votre code. Votre code est composé de 6 chiffres
                  </p>
                  <Input
                    value={code}
                    className="bg-white/10 text-white"
                    placeholder="Code..."
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    className="mt-5 w-full bg-white/10 text-white"
                    onClick={onPressVerify}
                  >Vérifier</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
