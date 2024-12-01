import type { ReactElement, SVGProps } from "react";

import type { SVGRProps } from "./types";

const Search = ({
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
      fill="#0E121B"
      fillRule="evenodd"
      d="M11.248 3.5a7.289 7.289 0 1 0 0 14.577 7.289 7.289 0 0 0 0-14.577ZM2.46 10.79a8.789 8.789 0 1 1 17.577 0 8.789 8.789 0 0 1-17.577 0Z"
      clipRule="evenodd"
    />
    <path
      fill="#0E121B"
      fillRule="evenodd"
      d="m16.736 15.648 5.616 5.6-1.06 1.063-5.615-5.601 1.06-1.062Z"
      clipRule="evenodd"
    />
  </svg>
);
export default Search;
