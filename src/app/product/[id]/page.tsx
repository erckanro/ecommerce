"use client";

import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { addToCart } from "@/redux/cartSlice";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const product = useSelector((state: RootState) =>
    state.product.products.find((p) => p.id === Number(id))
  );

  if (!product) return <p>Product not found or still loading.</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="text-lime-600 cursor-pointer"
        >
          Browse More
        </button>
        <button onClick={() => router.back()} className="cursor-pointer">
          ✕
        </button>
      </div>

      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-contain"
      />
      <h1 className="text-xl font-bold mt-4">{product.title}</h1>
      <p className="text-gray-600 mt-2">{product.category}</p>
      <p className="text-lg font-semibold mt-2">${product.price}</p>
      <p className="mt-4">{product.description}</p>
      <button
        className="mt-6 bg-lime-600 text-white px-4 py-2 rounded-lg cursor-pointer"
        onClick={() => {
          dispatch(addToCart(product));
          toast.success("Added to cart!");
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
