// Relative import (not the @/ alias) so the standalone `tsx` seed runner,
// which doesn't resolve tsconfig paths, can import this file.
import { PlaceCategory } from "../constants/TouristPlacesEnum";

// Canonical seed dataset for tourist places. Consumed by `npm run seed`.
// Intentionally has no _id / timestamps — Mongo generates those.
export type PlaceSeed = {
  name: string;
  slug: string;
  url: string;
  city: string;
  state: string;
  country: string;
  location: string;
  category: PlaceCategory;
  image: string;
  tours: number;
  price: number;
  description: string;
  rating: number;
  averageRating: number;
  isActive: boolean;
};

export const placesSeed: PlaceSeed[] = [
  {
    name: "Agra",
    slug: "agra",
    url: "/destinations/agra",
    city: "Agra",
    state: "Uttar Pradesh",
    country: "India",
    location: "Agra, Uttar Pradesh, India",
    category: PlaceCategory.HISTORICAL,
    image: "https://sukhholidays.com/wp-content/uploads/2025/10/12529715.jpeg",
    tours: 2,
    price: 10000,
    description: "Agra is famous for the Taj Mahal and Mughal architecture.",
    rating: 4.5,
    averageRating: 4.5,
    isActive: true,
  },
  {
    name: "Ranthambore",
    slug: "ranthambore",
    url: "/destinations/ranthambore",
    city: "Ranthambore",
    state: "Rajasthan",
    country: "India",
    location: "Ranthambore, Rajasthan, India",
    category: PlaceCategory.WILDLIFE,
    image: "https://sukhholidays.com/wp-content/uploads/2025/10/l4huijlgex4.jpg",
    tours: 2,
    price: 20000,
    description:
      "Ranthambore is known for its tiger reserve and wildlife safari.",
    rating: 4.7,
    averageRating: 4.7,
    isActive: true,
  },
  {
    name: "Jodhpur",
    slug: "jodhpur",
    url: "/destinations/jodhpur",
    city: "Jodhpur",
    state: "Rajasthan",
    country: "India",
    location: "Jodhpur, Rajasthan, India",
    category: PlaceCategory.HISTORICAL,
    image: "https://sukhholidays.com/wp-content/uploads/2025/10/4453955.jpg",
    tours: 1,
    price: 30000,
    description: "Jodhpur is known as the Blue City of Rajasthan.",
    rating: 4.4,
    averageRating: 4.4,
    isActive: true,
  },
  {
    name: "Jaipur",
    slug: "jaipur",
    url: "/destinations/jaipur",
    city: "Jaipur",
    state: "Rajasthan",
    country: "India",
    location: "Jaipur, Rajasthan, India",
    category: PlaceCategory.CULTURAL,
    image: "https://sukhholidays.com/wp-content/uploads/2025/10/27833732.jpeg",
    tours: 5,
    price: 40000,
    description: "Jaipur is popularly known as the Pink City of India.",
    rating: 4.8,
    averageRating: 4.8,
    isActive: true,
  },
  {
    name: "Delhi",
    slug: "delhi",
    url: "/destinations/delhi",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    location: "Delhi, India",
    category: PlaceCategory.URBAN,
    image: "https://sukhholidays.com/wp-content/uploads/2025/10/4813658.jpg",
    tours: 1,
    price: 50000,
    description:
      "Delhi is the capital city of India with rich heritage and modern attractions.",
    rating: 4.3,
    averageRating: 4.3,
    isActive: true,
  },
  {
    name: "Udaipur",
    slug: "udaipur",
    url: "/destinations/udaipur",
    city: "Udaipur",
    state: "Rajasthan",
    country: "India",
    location: "Udaipur, Rajasthan, India",
    category: PlaceCategory.ROMANTIC,
    image:
      "https://sukhholidays.com/wp-content/uploads/2024/02/Destination-01.webp",
    tours: 3,
    price: 60000,
    description: "Udaipur is known for its beautiful lakes and royal palaces.",
    rating: 4.9,
    averageRating: 4.9,
    isActive: true,
  },
  {
    name: "Bali",
    slug: "bali",
    url: "/destinations/bali",
    city: "Denpasar",
    state: "Bali",
    country: "Indonesia",
    location: "Bali, Indonesia",
    category: PlaceCategory.ROMANTIC,
    image:
      "https://sukhholidays.com/wp-content/uploads/2024/02/Destination-07.webp",
    tours: 4,
    price: 95000,
    description:
      "Bali is a tropical paradise famed for beaches, rice terraces and temples.",
    rating: 4.8,
    averageRating: 4.8,
    isActive: true,
  },
  {
    name: "Dubai",
    slug: "dubai",
    url: "/destinations/dubai",
    city: "Dubai",
    state: "Dubai",
    country: "United Arab Emirates",
    location: "Dubai, UAE",
    category: PlaceCategory.URBAN,
    image:
      "https://sukhholidays.com/wp-content/uploads/2024/02/Destination-03.webp",
    tours: 6,
    price: 120000,
    description:
      "Dubai blends futuristic skylines, desert safaris and luxury shopping.",
    rating: 4.6,
    averageRating: 4.6,
    isActive: true,
  },
  {
    name: "Pushkar",
    slug: "pushkar",
    url: "/destinations/pushkar",
    city: "Pushkar",
    state: "Rajasthan",
    country: "India",
    location: "Pushkar, Rajasthan, India",
    category: PlaceCategory.RELIGIOUS,
    image:
      "https://sukhholidays.com/wp-content/uploads/2024/02/Destination-02.webp",
    tours: 1,
    price: 35000,
    description: "Pushkar is known for its sacred lake and Brahma Temple.",
    rating: 4.6,
    averageRating: 4.6,
    isActive: true,
  },
  {
    name: "Jaisalmer",
    slug: "jaisalmer",
    url: "/destinations/jaisalmer",
    city: "Jaisalmer",
    state: "Rajasthan",
    country: "India",
    location: "Jaisalmer, Rajasthan, India",
    category: PlaceCategory.ADVENTURE,
    image:
      "https://sukhholidays.com/wp-content/uploads/2024/02/Destination-05.webp",
    tours: 2,
    price: 45000,
    description: "Jaisalmer is famous for its golden fort and desert camps.",
    rating: 4.7,
    averageRating: 4.7,
    isActive: true,
  },
];
