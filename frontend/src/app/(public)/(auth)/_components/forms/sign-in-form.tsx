"use client";

import { SystemInput } from "@/app/components/inputs/system-input";

import { SystemLabel } from "@/app/components/inputs/utilities/system-label";
import { SeparatorMiddle } from "@/app/components/separator-middle";
import { SystemButton } from "@/app/components/system-button";

import {
  SignInFormValues,
  signInValidation,
} from "@/shared/validations/sign-in-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AuthFormBody } from "./auth-form-body";
import { AuthAuxiliarLink } from "../auth-auxiliar-link";
import { AuthFields } from "./auth-fields";

interface SignInFormProps {
  onSubmit: (data: SignInFormValues) => Promise<void>;
}

export function SignInForm(props: Readonly<SignInFormProps>) {
  const { onSubmit } = props;

  const form = useForm<SignInFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInValidation),
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

            <AuthAuxiliarLink href="/forgot-password">
              Forgot Password?
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

        <fieldset className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <SystemLabel required htmlFor="password">
              Password
            </SystemLabel>
          </div>

          <SystemInput
            control={control}
            name="password"
            placeholder="Password"
            input={{ type: "password", className: "border-border" }}
          />
        </fieldset>
      </AuthFields>

      <div className="w-full flex flex-col items-center justify-center gap-4">
        <SystemButton
          type="submit"
          className="sm:w-full hover:bg-[#C75AF6] px-6"
          isFetching={formState.isSubmitting}
        >
          Sign In
        </SystemButton>

        <SeparatorMiddle className="w-full">
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
      </div>
    </AuthFormBody>
  );
}
