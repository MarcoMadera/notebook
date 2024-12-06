"use client";

import { ReactElement } from "react";

import { useSearchParams } from "next/navigation";

export function SearchQuery(): ReactElement {
  const searchParams = useSearchParams();

  return (
    <div>
      <p>{searchParams.get("q")}</p>
    </div>
  );
}
