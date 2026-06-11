"use client";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import type { RootState } from "@/redux/store";
import { clearCart, removeFromCart } from "@/redux/slices/cartSlice";

export default function CartPage() {
  const { cartItems, totalPrice } = useSelector((s: RootState) => s.cart);
  const dispatch = useDispatch();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-bold text-(--primary)">
          Your cart is empty
        </h1>
        <p className="mt-2 text-gray-500">
          Add a tour package to get started.
        </p>
        <Link
          href="/destinations"
          className="mt-6 rounded-xl bg-(--primary) px-6 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Browse Destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold text-(--primary)">Your Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <ul className="space-y-4 lg:col-span-2">
          {cartItems.map((item) => (
            <li
              key={item._id}
              className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={96}
                height={96}
                className="h-24 w-24 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.city}, {item.state}
                </p>
                <p className="mt-1 font-semibold text-(--primary)">
                  ₹{item.price?.toLocaleString("en-IN")}
                </p>
              </div>
              <button
                aria-label={`Remove ${item.name}`}
                onClick={() => {
                  dispatch(removeFromCart(item._id));
                  toast.info(`${item.name} removed from cart`);
                }}
                className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
              >
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
          <div className="mt-4 flex justify-between text-gray-600">
            <span>Items</span>
            <span className="font-semibold">{cartItems.length}</span>
          </div>
          <div className="mt-2 flex justify-between text-gray-600">
            <span>Total</span>
            <span className="text-2xl font-extrabold text-(--primary)">
              ₹{totalPrice.toLocaleString("en-IN")}
            </span>
          </div>

          <button
            onClick={() => toast.success("Checkout is a demo — booking confirmed!")}
            className="mt-6 w-full rounded-xl bg-(--primary) py-3 font-semibold text-white transition hover:opacity-90"
          >
            Proceed to Checkout
          </button>
          <button
            onClick={() => {
              dispatch(clearCart());
              toast.info("Cart cleared");
            }}
            className="mt-3 w-full rounded-xl border border-gray-300 py-3 font-semibold text-gray-600 transition hover:bg-gray-50"
          >
            Clear Cart
          </button>
        </aside>
      </div>
    </div>
  );
}
