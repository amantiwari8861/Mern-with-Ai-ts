"use client";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { TouristPlace } from "@/types/allTypes";
import TiltCard from "@/components/three-d/TiltCard";

export default function DestinationCard({ place }: { place: TouristPlace }) {
  const { name, city, state, image, slug, price, category } = place;
  const subtitle = name === city ? state : `${city}, ${state}`;

  return (
    <Link href={`/destinations/${slug}`} className="block perspective-1000">
      <TiltCard className="group relative h-80 w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-2xl will-change-transform">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent" />

        {category && (
          <span className="absolute right-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-(--primary) [transform:translateZ(45px)]">
            {category}
          </span>
        )}

        <div className="absolute bottom-0 left-0 p-5 text-white [transform:translateZ(35px)]">
          <h3 className="text-2xl font-bold drop-shadow">{name}</h3>
          <p className="flex items-center gap-1 text-sm text-white/85">
            <MapPin size={14} />
            {subtitle}
          </p>
          {typeof price === "number" && (
            <p className="mt-1 text-sm font-semibold text-(--secondary)">
              From ₹{price.toLocaleString("en-IN")}
            </p>
          )}
        </div>
      </TiltCard>
    </Link>
  );
}
