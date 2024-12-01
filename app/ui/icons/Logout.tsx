import type { ReactElement, SVGProps } from "react";

import type { SVGRProps } from "./types";

const Logout = ({
  title,
  titleId,
  desc,
  descId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps): ReactElement => (
  <svg
    width="1em"
    height="1em"
    fill="none"
    aria-labelledby={titleId}
    aria-describedby={descId}
    {...props}
  >
    {desc ? <desc id={descId}>{desc}</desc> : null}
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      stroke="#0E121B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M21 11.998H8.945m12.055 0-2.932-2.934M21 11.998l-2.932 2.936m-3.512-6.668V7.251a3.19 3.19 0 0 0-2.651-3.15L6.702 3.046C4.765 2.718 3 4.219 3 6.195v11.61c0 1.976 1.765 3.477 3.702 3.15l5.203-1.057a3.188 3.188 0 0 0 2.65-3.149v-1.014"
    />
  </svg>
);
export default Logout;
