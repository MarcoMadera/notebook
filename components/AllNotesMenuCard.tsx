import { ReactElement } from "react";

import { useSearchParams } from "next/navigation";

import { ALink } from "./ALink";
import styles from "./AllNotesMenuCard.module.css";

import { formatDate } from "@/utils/formatDate";

export function AllNotesMenuCard({
  title,
  tags,
  date,
  selected,
  id,
  baseUrl = "",
}: Readonly<{
  title: string;
  id: string;
  tags: {
    tag: {
      name: string;
    };
  }[];
  date: string;
  baseUrl?: string;
  selected?: boolean;
}>): ReactElement {
  const searchParams = useSearchParams();

  const currentParams = new URLSearchParams(searchParams?.toString() ?? "");
  const href = `${baseUrl}/${id}${currentParams.toString() ? `?${currentParams.toString()}` : ""}`;

  return (
    <ALink
      href={href}
      className={`${styles.linkContainer}  ${selected ? styles.selected : ""}`}
    >
      <article className={styles.container}>
        <h2 className="text-preset-3">{title}</h2>
        <div className={styles.tags}>
          {tags.map(({ tag }) => {
            return (
              <span className={`text-preset-6 ${styles.tag}`} key={tag.name}>
                {tag.name}
              </span>
            );
          })}
        </div>
        <time dateTime={date} className={`text-preset-6 ${styles.date}`}>
          {formatDate(date, "en")}
        </time>
      </article>
    </ALink>
  );
}
