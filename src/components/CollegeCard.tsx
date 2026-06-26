import Link from "next/link";

type Props = {
  id: number;
  name: string;
  location: string;
  ranking: number;
  image: string;
  isFavorite: boolean;
  onFavorite: (id: number) => void;
};

export default function CollegeCard({
   id,
  name,
  location,
  ranking,
  image,
  isFavorite,
  onFavorite,
}: Props) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold">{name}</h2>

        <p className="text-gray-600">{location}</p>

        <p className="mt-2 font-medium">
          Ranking #{ranking}
        </p>

        <button
            onClick={() => onFavorite(id)}
            className="mt-2 px-3 py-2 rounded bg-red-500 text-white"
        >
            {isFavorite ? "❤️ Remove Favorite" : "🤍 Add Favorite"}
        </button>

        <Link href={`/college/${id}`}>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
                View Details
            </button>
        </Link>
      </div>
    </div>
  );
}