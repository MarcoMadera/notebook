import { ReactElement } from "react";

import type { Metadata } from "next";

import AuthLayout from "../layouts/auth-layout";

import Card from "@/components/Card";

export const metadata: Metadata = {
  title: "Auth Pages",
  description: "Taking notes",
};

export default function MyAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <AuthLayout>
      <Card>{children}</Card>
    </AuthLayout>
  );
}
