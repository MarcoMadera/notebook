import type { ReactElement, SVGProps } from "react";

import type { SVGRProps } from "./types";

const Clock = ({
  title,
  titleId,
  desc,
  descId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps): ReactElement => (
  <svg
    width="1.5em"
    height="1.5em"
    viewBox="0 0 24 24"
    fill="none"
    aria-labelledby={titleId}
    aria-describedby={descId}
    {...props}
  >
    {desc ? <desc id={descId}>{desc}</desc> : null}
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12.25 3.75a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM2.5 12a9.75 9.75 0 0 1 9.75-9.75A9.75 9.75 0 0 1 22 12c0 5.384-4.364 9.75-9.75 9.75-5.385 0-9.75-4.366-9.75-9.75Z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M11.922 7.827a.75.75 0 0 1 .75.75v3.672l2.81 1.68a.75.75 0 1 1-.77 1.287l-3.174-1.897a.75.75 0 0 1-.366-.644V8.577a.75.75 0 0 1 .75-.75Z"
      clipRule="evenodd"
    />
  </svg>
);
export default Clock;
