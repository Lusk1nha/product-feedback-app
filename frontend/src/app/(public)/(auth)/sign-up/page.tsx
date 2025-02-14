"use client";

import { SignUpFormValues } from "@/shared/validations/sign-up-validation";
import { AuthSubTitle } from "../_components/auth-subtitle";
import { AuthTitle } from "../_components/auth-title";
import { SignUpForm } from "../_components/forms/sign-up-form";

import { motion } from "motion/react";

export default function SignUpPage() {
  async function handleSignUp(data: SignUpFormValues) {
    console.log("data", data);
  }

  return (
    <motion.div
      className="flex flex-col gap-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col">
        <AuthTitle className="font-bold">Sign Up</AuthTitle>
        <AuthSubTitle>
          to <span className="text-[#3A4374] underline">Feedback</span> your
          products.
        </AuthSubTitle>
      </div>

      <SignUpForm onSubmit={handleSignUp} />
    </motion.div>
  );
}
