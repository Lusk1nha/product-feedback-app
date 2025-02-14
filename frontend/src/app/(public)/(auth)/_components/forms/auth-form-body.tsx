import { FieldValues, UseFormReturn } from "react-hook-form";

interface AuthFormBodyProps<T extends FieldValues> {
  children: React.ReactNode;

  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
}

export function AuthFormBody<T extends FieldValues>(
  props: Readonly<AuthFormBodyProps<T>>
) {
  const { children, form, onSubmit } = props;

  return (
    <form
      className="w-full flex flex-col gap-y-10"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {children}
    </form>
  );
}
