// Canonical client-facing user (no password). Single source of truth — the
// previous global ambient `User` in global.d.ts has been removed.
type User = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  userImage?: string;
};

type RegisterInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  userPrinciple: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (input: RegisterInput) => Promise<boolean>;
  logout: () => Promise<void>;
};

type Destination = {
  _id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  imageUrl: string;
  tours: number;
  slug: string;
  url: string;
  price: number;
  description: string;
};

interface Review {
  userId?: string;
  rating?: number;
  comment?: string;
  createdAt?: Date;
}

interface TouristPlace {
  _id: string;

  name: string;
  slug: string;
  url: string;

  city: string;
  state: string;
  country: string;
  location: string;

  category:
    | "Historical"
    | "Wildlife"
    | "Cultural"
    | "Urban"
    | "Romantic"
    | "Adventure"
    | "Religious";

  image: string;

  tours: number;
  price: number;

  description: string;

  rating: number;
  averageRating: number;

  reviews?: Review[];

  isActive: boolean;
}

export type {
  User,
  RegisterInput,
  AuthContextType,
  Destination,
  Review,
  TouristPlace,
};
