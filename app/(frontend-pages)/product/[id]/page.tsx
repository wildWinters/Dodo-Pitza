export interface PageProps {
  params: { id: string };
}

export default function Name({ params }: PageProps) {
  return (
    <>
      <div className="text-xl font-bold">ID: {params.id}</div>
    </>
  );
}
