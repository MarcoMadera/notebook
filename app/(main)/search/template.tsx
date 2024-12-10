import { PropsWithChildren, ReactElement } from "react";

export default function Template({
  children,
}: Readonly<PropsWithChildren>): ReactElement {
  return <>{children}</>;
}
