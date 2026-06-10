import { TouristPlace } from "@/types/allTypes";
import { connectDB } from "@/backend/config/mongoose.config";
import PlacesDao from "@/backend/model/places.model";
import Image from "next/image";
import Link from "next/link";

// Server Component — queries MongoDB directly (no fetch() needed).
// Lives in views/ to avoid conflict with Next.js Pages Router (pages/ is reserved).
const Collections = async () => {
  await connectDB();
  const touristPlaces: TouristPlace[] = await PlacesDao.find({ isActive: true }).lean();

  return (
    <div className="container mx-auto grid grid-cols-4 gap-4 p-6">
      {touristPlaces?.map((place) => (
        <PlaceCard key={place._id} place={place} />
      ))}
    </div>
  );
};

export default Collections;

const PlaceCard = ({ place }: { place: TouristPlace }) => {
  const { name, city, state, image, slug } = place;

  return (
    <Link href={`destinations/${slug}`}>
      <div className="group relative overflow-hidden rounded-2xl transition-shadow hover:shadow-xl">
        <Image
          src={image}
          alt={name}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
          height={600}
          width={600}
          loading="eager"
        />
        <div className="glassmorphism absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
        <span className="absolute bottom-0 left-0 text-white p-6 text-xl">
          {name}
          <p>{name === city ? state : `${city}, ${state}`}</p>
        </span>
      </div>
    </Link>
  );
};
