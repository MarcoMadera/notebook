import { ReactElement } from "react";

import styles from "./AuthHeader.module.css";
import { Logo } from "./Logo";

interface Props {
  headeLine: string;
  secondaryHeadLine: string;
}

export function AuthHeader({
  headeLine,
  secondaryHeadLine,
}: Readonly<Props>): ReactElement {
  return (
    <>
      <div className="alignCenter">
        <Logo />
      </div>
      <div className={`${styles.headerContainer} alignCenter`}>
        <h1 className="text-preset-1">{headeLine}</h1>
        <p className="text-preset-5">{secondaryHeadLine}</p>
      </div>
    </>
  );
}
