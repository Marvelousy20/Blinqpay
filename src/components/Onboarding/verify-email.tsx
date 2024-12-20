"use client";

import apiCAll from "@/lib/apiCall";
import { saveToken } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm, Form, set } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as yup from "yup";
import { OTP } from "../otp-input";
import Link from "next/link";
import { notify } from "@/components/ui/toast";

export default function VerifyEmail() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [code, setCode] = React.useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = React.useState<string>(searchParams.get("email") as string);
  /*
   *
   *
   *
   *
   */
  async function handleSubmitOTP() {
    if (isLoading) return;

    setIsLoading(true);
    if (code.length < 6) return notify.error("Code is less that 6 digits!");

    const credentials = {
      email: email || searchParams.get("email"),
      code,
    };

    await apiCAll({
      url: "/auth/verify/email",
      method: "POST",
      data: credentials,
      toast: true,
      sCB(res) {
        console.log(res);
        setIsLoading(false);
        return router.push("/auth");
      },
      eCB(err) {
        setIsLoading(false);
      },
    });
  }

  async function handleResendCode() {
    if (isLoading) return;
    setIsLoading(true);
    if (!email || !searchParams.get("email")) return notify.error("No email provided!!");

    await apiCAll({
      url: "/auth/verify/email/code/resend",
      method: "POST",
      data: { email },
      toast: true,
      sCB(res) {
        console.log(res);
        setIsLoading(false);
      },
      eCB(res) {
        setIsLoading(false);
      },
    });
  }
  /*
   *
   *
   *
   *
   */
  useEffect(() => {
    if (!email) setEmail(searchParams.get("email") as string);
  }, [email, searchParams]);
  /*
   *
   *
   *
   *
   */
  return (
    <main className="by-milky dark:bg-primary-dashboard dark:text-white p-5 md:p-10 md:w-[30rem] flex flex-col items-center text-left  md:text-center">
      <div>
        <h3 className="text-4xl font-bold">Verify your account</h3>
        <p className="mt-2 opacity-60">We sent you a verification code to your mail at {email}</p>
      </div>

      <div className="w-auto mt-[2.625rem]">
        <OTP code={code} setCode={setCode} error={false} />
      </div>

      <Button
        onClick={handleSubmitOTP}
        isLoading={isLoading}
        variant={"primary"}
        className="w-full py-3 mt-6"
        size={"lg"}
      >
        Verify code
      </Button>

      <div className="mt-12 flex justify-center gap-x-1">
        <span className="text-center block opacity-25">Don&apos;t receive code?</span>
        <button onClick={handleResendCode} className="text-[#6E5BFF] block text-center opacity-100">
          Resend Code
        </button>
      </div>
    </main>
  );
}
