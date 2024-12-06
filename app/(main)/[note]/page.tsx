export default async function Page({
  params,
}: {
  params: Promise<{ note: string }>;
}) {
  const note = (await params).note;
  return <div>My note: {note}</div>;
}
