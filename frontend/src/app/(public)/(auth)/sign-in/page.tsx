"use client";

import { AuthTitle } from "../_components/auth-title";
import { AuthSubTitle } from "../_components/auth-subtitle";
import { SignInForm } from "../_components/forms/sign-in-form";

import { SignInFormValues } from "@/shared/validations/sign-in-validation";

import { motion } from "motion/react";

export default function SignInPage() {
  async function handleSignIn(data: SignInFormValues) {
    console.log("data", data);
  }

  return (
    <motion.div
      className="flex flex-col gap-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col">
        <AuthTitle className="font-bold">Sign In</AuthTitle>
        <AuthSubTitle>
          to <span className="text-[#3A4374] underline">Feedback</span> your
          products.
        </AuthSubTitle>
      </div>

      <SignInForm onSubmit={handleSignIn} />
    </motion.div>
  );
}
