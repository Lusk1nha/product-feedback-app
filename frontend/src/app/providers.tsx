"use client";

import { Toaster } from "@/app/components/ui/sonner";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers(props: Readonly<ProvidersProps>) {
  const { children } = props;

  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
