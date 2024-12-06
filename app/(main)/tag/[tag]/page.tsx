export default async function Page({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const tag = (await params).tag;
  return <div>My Tag: {decodeURIComponent(tag)}</div>;
}
