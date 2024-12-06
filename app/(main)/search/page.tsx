import { ReactElement } from "react";

import { SearchQuery } from "./SearchQuery";

export default function Search(): ReactElement {
  return (
    <div>
      <p>Search</p>
      <SearchQuery />
    </div>
  );
}
