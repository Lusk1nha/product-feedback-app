"use client";

import { ForgotPasswordFormValues } from "@/shared/validations/forgot-password-validation";
import { AuthSubTitle } from "../_components/auth-subtitle";
import { AuthTitle } from "../_components/auth-title";
import { ForgotPasswordForm } from "../_components/forms/forgot-password-form";

import { motion } from "motion/react";

export default function ForgotPasswordPage() {
  async function handleForgotPassword(data: ForgotPasswordFormValues) {
    console.log("data", data);
  }

  return (
    <motion.div
      className="flex flex-col gap-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col">
        <AuthTitle className="font-bold">Forgot Password</AuthTitle>
        <AuthSubTitle>
          to <span className="text-[#3A4374] underline">Feedback</span> your
          products.
        </AuthSubTitle>
      </div>

      <ForgotPasswordForm onSubmit={handleForgotPassword} />
    </motion.div>
  );
}
