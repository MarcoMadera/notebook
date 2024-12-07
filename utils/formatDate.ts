export function formatDate(dateString: string, locale: string): string {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const parts = formatter.formatToParts(date);
  const mappedParts = parts.map((p) => p.value);
  const formattedDate = `${mappedParts[2]} ${mappedParts[0]} ${mappedParts[4]}`;
  return formattedDate;
}
