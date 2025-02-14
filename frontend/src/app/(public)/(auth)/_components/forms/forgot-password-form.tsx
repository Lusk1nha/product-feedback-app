"use client";

import {
  ForgotPasswordFormValues,
  forgotPasswordValidation,
} from "@/shared/validations/forgot-password-validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormBody } from "./auth-form-body";
import { SystemButton } from "@/app/components/system-button";
import { SystemInput } from "@/app/components/inputs/system-input";
import { SystemLabel } from "@/app/components/inputs/utilities/system-label";
import { SeparatorMiddle } from "@/app/components/separator-middle";
import Link from "next/link";
import { AuthAuxiliarLink } from "../auth-auxiliar-link";
import { AuthFields } from "./auth-fields";

interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordFormValues) => Promise<void>;
}

export function ForgotPasswordForm(props: Readonly<ForgotPasswordFormProps>) {
  const { onSubmit } = props;

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordValidation),
    defaultValues: {
      email: "",
    },
  });

  const { control, formState } = form;

  return (
    <AuthFormBody form={form} onSubmit={onSubmit}>
      <AuthFields>
        <fieldset className="flex flex-col gap-y-4">
          <div className="flex flex-wrap items-center justify-between gap-x-1">
            <SystemLabel required htmlFor="email">
              Email
            </SystemLabel>

            <AuthAuxiliarLink href="/sign-in">
              Return to Sign In
            </AuthAuxiliarLink>
          </div>

          <SystemInput
            control={control}
            name="email"
            placeholder="Email Address"
            input={{
              type: "email",
              className: "border-border",
            }}
          />
        </fieldset>

        <SystemButton
          type="submit"
          className="sm:w-full hover:bg-[#C75AF6] px-6"
          isFetching={formState.isSubmitting}
        >
          Send Reset Link
        </SystemButton>

        <SeparatorMiddle>
          <span className="text-sm text-[#647196] font-normal">or</span>
        </SeparatorMiddle>

        <Link className="w-full" href="/sign-up">
          <SystemButton
            type="button"
            className="sm:w-full bg-[#F7F8FD] text-[#3A4374] hover:bg-[#EAEFFB] px-6"
          >
            Create an Account
          </SystemButton>
        </Link>
      </AuthFields>
    </AuthFormBody>
  );
}
