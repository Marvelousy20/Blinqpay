"use client";
import Image from "next/image";
import Link from "next/link";
import * as yup from "yup";
import { Input, PasswordInput } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn, saveToken } from "@/lib/utils";
import React, { useEffect } from "react";
import apiCAll from "@/lib/apiCall";
import { notify } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/store";

const Schema = yup.object().shape({
  email: yup.string().required("Email is required!"),
  password: yup.string().required("password is required"),
});

type SchemaTypes = yup.InferType<typeof Schema>;

const defaultValues: SchemaTypes = {
  email: "",
  password: "",
};

export default function Login() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const { setAllConnectedBanks } = useStore();

  const form = useForm<SchemaTypes>({
    resolver: yupResolver(Schema),
    defaultValues,
    mode: "all",
  });

  /*
   *
   *
   *
   *
   */
  async function onSubmit(values: SchemaTypes) {
    if (isLoading) return;

    try {
      setIsLoading(true);

      await apiCAll({
        url: "/auth/login",
        method: "POST",
        data: values,
        sCB(res) {
          const token = res.data.accessToken;
          saveToken(token);
          setIsLoading(false);
          router.push("/dashboard");
        },
        eCB(res) {
          console.log(res.message, "ecb");
          setIsLoading(false);
        },
        toast: true,
      });
    } catch (error) {
      console.log(error, "==> error");
    }
  }
  /*
   *
   *
   *
   *
   */
  useEffect(() => {
    setAllConnectedBanks([]);
  }, []);

  return (
    <div className="lg:grid grid-cols-2 gap-x-12 xl:gap-x-20 bg-milky sm:bg-white dark:bg-primary dark:text-white lg:px-24 xl:px-36 min-h-screen items-center pt-12 lg:pt-0">
      {/* Illustration */}
      <div>
        <Image src="/onboarding/login.svg" alt="register" width={517} height={514} className="hidden xl:block" />
        <Image
          src="/onboarding/login.svg"
          alt="register"
          width={360}
          height={350}
          className="hidden lg:block xl:hidden"
        />
      </div>

      {/* Get started */}
      <div className="w-full mx-auto sm:rounded-xl sm:bg-milky dark:sm:bg-onboard-bg sm:border border-white p-5 border-opacity-25 sm:max-w-xl lg:max-w-[35rem]">
        <div>
          <h3 className="text-4xl font-bold">Login</h3>
          <p className="opacity-60 mt-2">Create an account to start your journey</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-8 lg:mt-4 xl:mt-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email" className="text-sm">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="dark:bg-auth-input"
                      type="email"
                      id="email"
                      placeholder="Email"
                      {...field}
                      error={form.formState.errors?.email?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mt-7">
                  <FormLabel htmlFor="password" className="text-sm">
                    Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      id="password"
                      className="dark:bg-auth-input"
                      placeholder="*******"
                      {...field}
                      error={form.formState.errors?.password?.message}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-10 text-center space-y-5">
              <div className="w-ful">
                <Button isLoading={isLoading} variant={"primary"} className="w-full py-3" size={"lg"}>
                  Log In
                </Button>
              </div>

              <div className="w-full mt-4">
                <Link href="/auth/forget-password" className={cn("w-full", buttonVariants({ size: "lg" }))}>
                  Forget Password
                </Link>
              </div>

              <div className="mt-12 flex justify-center gap-x-1">
                <span className="text-center block opacity-25">Don&apos;t have an account?</span>
                <Link href="/auth/register" className="text-[#6E5BFF] block text-center opacity-100">
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
