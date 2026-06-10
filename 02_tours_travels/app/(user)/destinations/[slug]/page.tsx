import { MapPin, Star, Clock, Plane } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddPackageBtn from "./AddPackageBtn";
import { connectDB } from "@/backend/config/mongoose.config";
import PlacesDao from "@/backend/model/places.model";

// Generate static paths for all active destinations at build time.
export async function generateStaticParams() {
    await connectDB();
    const places = await PlacesDao.find({ isActive: true }, { slug: 1, _id: 0 }).lean();
    return places.map((place: any) => ({ slug: place.slug }));
}

const DestinationDescription = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    console.log("slug:",slug);
    
    await connectDB();
    const destination = await PlacesDao.findOne({ slug, isActive: true }).lean() as any;
    console.log("destn :",destination);
    
    if (!destination) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-sky-50 to-white">
            {/* Hero Section */}
            <div className="relative h-125 overflow-hidden">
                <Image
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                    width={1200}
                    height={1000}
                    loading="eager"
                />

                <div className="absolute inset-0 bg-black/50" />

                <div className="absolute bottom-10 left-10 text-white">
                    <p className="flex items-center gap-2 text-lg mb-3">
                        <MapPin size={20} />
                        {destination.city}, {destination.state}
                    </p>

                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                        {destination.name}
                    </h1>

                    <div className="flex items-center gap-6 text-lg">
                        <span className="flex items-center gap-2">
                            <Star className="fill-yellow-400 text-yellow-400" size={20} />
                            4.9 Rating
                        </span>

                        <span className="flex items-center gap-2">
                            <Plane size={20} />
                            {destination.tours}+ Tours
                        </span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-3 gap-10">
                {/* Left Side */}
                <div className="lg:col-span-2">
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">
                        Explore {destination.name}
                    </h2>

                    <p className="text-gray-600 text-lg leading-9">
                        {destination.description}
                    </p>

                    {/* Features */}
                    <div className="grid md:grid-cols-3 gap-6 mt-10">
                        <div className="bg-white shadow-xl rounded-3xl p-6 border border-gray-100 hover:-translate-y-2 duration-300">
                            <Clock className="text-sky-500 mb-4" size={35} />
                            <h3 className="text-xl font-bold mb-2">5 Days Tour</h3>
                            <p className="text-gray-500">
                                Enjoy a premium guided experience.
                            </p>
                        </div>

                        <div className="bg-white shadow-xl rounded-3xl p-6 border border-gray-100 hover:-translate-y-2 duration-300">
                            <Plane className="text-pink-500 mb-4" size={35} />
                            <h3 className="text-xl font-bold mb-2">Flight Included</h3>
                            <p className="text-gray-500">Comfortable travel arrangements.</p>
                        </div>

                        <div className="bg-white shadow-xl rounded-3xl p-6 border border-gray-100 hover:-translate-y-2 duration-300">
                            <Star className="text-yellow-500 mb-4" size={35} />
                            <h3 className="text-xl font-bold mb-2">Top Rated</h3>
                            <p className="text-gray-500">Loved by thousands of travelers.</p>
                        </div>
                    </div>
                </div>

                {/* Right Side Card */}
                <div>
                    <div className="sticky top-10 bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                        <p className="text-gray-500 mb-2">Starting From</p>

                        <h2 className="text-5xl font-extrabold text-sky-600 mb-6">
                            ₹{destination.price}
                        </h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-600">
                                <span>Destination</span>
                                <span className="font-semibold">{destination.name}</span>
                            </div>

                            <div className="flex justify-between text-gray-600">
                                <span>Tours Available</span>
                                <span className="font-semibold">{destination.tours}</span>
                            </div>

                            <div className="flex justify-between text-gray-600">
                                <span>Country</span>
                                <span className="font-semibold">{destination.country}</span>
                            </div>
                        </div>

                        <AddPackageBtn destination={destination} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DestinationDescription;
