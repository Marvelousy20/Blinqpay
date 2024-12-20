import ForgetPassword from "@/components/Onboarding/ForgetPassword";
import VerifyEmail from "@/components/Onboarding/verify-email";
import { Suspense } from "react";
export default function ForgotPassword() {
  return (
    <main className="w-full h-screen place-content-center grid dark:bg-primary p-4 md:p-0">
      <Suspense>
        <VerifyEmail />
      </Suspense>
    </main>
  );
}
