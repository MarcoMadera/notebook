import type { ReactElement, SVGProps } from "react";

import type { SVGRProps } from "./types";

const Cross = ({
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
      d="m6 6 12 12m0-12L6 18"
    />
  </svg>
);
export default Cross;
