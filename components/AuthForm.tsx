import type {
  DetailedHTMLProps,
  FormHTMLAttributes,
  PropsWithChildren,
  ReactElement,
} from "react";

import styles from "./AuthForm.module.css";

export function AuthForm(
  props: Readonly<
    PropsWithChildren<
      DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
    >
  >
): ReactElement {
  const { children, ...rest } = props;
  return (
    <form {...rest} className={styles.form}>
      {props.children}
    </form>
  );
}
