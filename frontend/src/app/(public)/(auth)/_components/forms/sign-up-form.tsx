"use client";

import {
  SignUpFormValues,
  signUpValidation,
} from "@/shared/validations/sign-up-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthFormBody } from "./auth-form-body";
import { SystemInput } from "@/app/components/inputs/system-input";
import { SystemLabel } from "@/app/components/inputs/utilities/system-label";
import { SystemDescription } from "@/app/components/inputs/utilities/system-description";
import { SystemButton } from "@/app/components/system-button";
import { SeparatorMiddle } from "@/app/components/separator-middle";
import Link from "next/link";
import { AuthFields } from "./auth-fields";

interface SignUpFormProps {
  onSubmit: (data: SignUpFormValues) => Promise<void>;
}

export function SignUpForm(props: Readonly<SignUpFormProps>) {
  const { onSubmit } = props;

  const form = useForm<SignUpFormValues>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signUpValidation),
  });

  const { control, formState } = form;

  return (
    <AuthFormBody form={form} onSubmit={onSubmit}>
      <AuthFields>
        <fieldset className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <SystemLabel required htmlFor="email">
              Email
            </SystemLabel>
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
            <SystemLabel required htmlFor="username">
              Username
            </SystemLabel>
            <SystemDescription>
              Your username will be visible to other users.
            </SystemDescription>
          </div>

          <SystemInput
            control={control}
            name="username"
            placeholder="Username"
            input={{
              type: "text",
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

        <fieldset className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <SystemLabel required htmlFor="confirmPassword">
              Confirm Password
            </SystemLabel>
          </div>

          <SystemInput
            control={control}
            name="confirmPassword"
            placeholder="Confirm Password"
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
          Sign Up
        </SystemButton>

        <SeparatorMiddle className="w-full">
          <span className="text-sm text-[#647196] font-normal">or</span>
        </SeparatorMiddle>

        <Link className="w-full" href="/sign-in">
          <SystemButton
            type="button"
            className="sm:w-full bg-[#F7F8FD] text-[#3A4374] hover:bg-[#EAEFFB] px-6"
          >
            Already have an account? Sign In
          </SystemButton>
        </Link>
      </div>
    </AuthFormBody>
  );
}
