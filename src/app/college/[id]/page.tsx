import { colleges } from "@/data/colleges";

export default async function CollegePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const college = colleges.find(
    (c) => c.id === Number(id)
  );

  if (!college) {
    return <h1>College Not Found</h1>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <img
        src={college.image}
        alt={college.name}
        className="w-full h-80 object-cover rounded-lg"
      />

      <h1 className="text-4xl font-bold mt-6">
        {college.name}
      </h1>

      <p className="mt-2 text-lg">
        Location: {college.location}
      </p>

      <p className="mt-2 text-lg">
        Ranking: #{college.ranking}
      </p>
    </main>
  );
}