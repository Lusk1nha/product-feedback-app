interface AuthFieldsProps {
  children?: React.ReactNode;
}

export function AuthFields(props: Readonly<AuthFieldsProps>) {
  const { children } = props;
  return <div className="flex flex-col gap-y-4">{children}</div>;
}
