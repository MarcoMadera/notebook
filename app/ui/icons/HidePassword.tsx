import type { ReactElement, SVGProps } from "react";

import type { SVGRProps } from "./types";

const HidePassword = ({
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
      strokeWidth={1.5}
      d="M6.42 17.73c-2.23-1.46-3.67-3.66-3.67-5.59 0-3.28 4.14-7.3 9.25-7.3 2.09 0 4.03.67 5.59 1.71m2.26 2.06c.891 1.13 1.41 2.38 1.41 3.53 0 3.28-4.15 7.3-9.26 7.3-.91 0-1.799-.13-2.63-.36"
    />
    <path
      stroke="#0E121B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.766 14.367a3.12 3.12 0 0 1-.925-2.23 3.159 3.159 0 0 1 5.394-2.24m.875 2.803a3.158 3.158 0 0 1-2.538 2.541m7.32-10.991L4.118 20.024"
    />
  </svg>
);
export default HidePassword;
