"use client";
import { addToCart } from '@/redux/slices/cartSlice';
import { TouristPlace } from '@/types/allTypes';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const AddPackageBtn = ({ destination }: { destination: TouristPlace }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleAdd = () => {
        dispatch(addToCart(destination));
        toast.success(`${destination.name} added to cart`);
    };

    return <>
        <button
            className="w-full bg-sky-600 hover:bg-sky-700 text-white py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-sky-300"
            onClick={handleAdd}
        >
            <ShoppingCart size={22} />
            Add Package To Cart
        </button>

        <button
            className="w-full mt-4 border-2 border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white py-4 rounded-2xl text-lg font-bold transition-all duration-300"
            onClick={() => {
                dispatch(addToCart(destination));
                router.push('/cart');
            }}
        >
            Book Now
        </button>
    </>
}

export default AddPackageBtn