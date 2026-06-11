"use client";
import Image from "next/image";

// A CSS-only 3D ring of destination cards that slowly rotates and pauses on
// hover. No WebGL — built entirely with perspective + preserve-3d transforms.
const ITEMS = [
  { img: "/images/places/place (1).jpg", title: "Taj Mahal", place: "Agra" },
  {
    img: "/images/places/place (2).jpg",
    title: "Humayun's Tomb",
    place: "Delhi",
  },
  { img: "/images/places/place (3).jpg", title: "Qutub Minar", place: "Delhi" },
  {
    img: "/images/places/place (4).jpg",
    title: "Ganga Ghat",
    place: "Varanasi",
  },
  {
    img: "https://sukhholidays.com/wp-content/uploads/2025/10/27833732.jpeg",
    title: "Hawa Mahal",
    place: "Jaipur",
  },
  {
    img: "https://sukhholidays.com/wp-content/uploads/2024/02/Destination-01.webp",
    title: "Lake Palace",
    place: "Udaipur",
  },
];

const ANGLE = 360 / ITEMS.length;
const RADIUS = 280;

export default function Hero3DCarousel() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-(--primary) to-(--tertiary) py-16 text-white">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-(--secondary)">
          Immersive
        </p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Explore in 3D</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/70">
          Hover to pause and spin through our signature destinations.
        </p>
      </div>

      <div className="three-d-stage mt-14 h-[320px]">
        <div className="three-d-ring h-[260px] w-[200px]">
          {ITEMS.map((item, i) => (
            <figure
              key={item.title}
              className="three-d-panel h-[260px] w-[200px]"
              style={{
                transform: `rotateY(${i * ANGLE}deg) translateZ(${RADIUS}px)`,
              }}
            >
              <Image
                src={item.img}
                alt={item.title}
                width={200}
                height={260}
                className="h-full w-full object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-black/55 p-3 text-center">
                <span className="block text-base font-semibold">
                  {item.title}
                </span>
                <span className="text-xs text-white/70">{item.place}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
