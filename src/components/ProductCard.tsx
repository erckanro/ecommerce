import React from "react";
import { Product } from "@/types";
import Link from "next/link";
import { AppDispatch } from "@/redux/store";
import { addToCart } from "@/redux/cartSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addToCart(product));
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-gray-300 ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img className="h-10 w-auto" src={product.image} alt="" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="green"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
                Added to cart!
              </p>
              <p className="mt-1 text-sm text-gray-500">{product.title}</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-300">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-lime-800 hover:text-indigo-500 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    ));
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="outline outline-slate-300 p-2 rounded-lg hover:shadow-2xl hover:outline-2 hover:outline-lime-600 transition cursor-pointer">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain"
        />
        <div className="details">
          <h3 className="text-md font-semibold mt-2 truncate">
            {product.title}
          </h3>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="gold"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                clipRule="evenodd"
              />
            </svg>
            {product.rating.rate}
            <span className="text-gray-500 text-sm">
              ({product.rating.count})
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className=" text-lime-600">
              <span className="text-sm">$</span>
              <span className="text-lg font-semibold">{product.price}</span>
            </div>
            <button
              className="text-gray-700 rounded-full p-1 hover:bg-lime-300 transition-colors cursor-pointer"
              onClick={handleAddToCart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="2.5em"
                height="1.5em"
              >
                <g fill="none">
                  <path
                    stroke="currentColor"
                    strokeWidth="1.5"
                    d="M7.5 18a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3Zm9 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3Z"
                  ></path>
                  <path
                    fill="currentColor"
                    d="m2.261 3.092l.249-.708zm-.012-.8a.75.75 0 1 0-.498 1.416zm2.337 2.031l.62-.423zm1.302 10.263l-.545.516zm14.77-4.703l.734.151l.001-.004zm-.5 2.425l.735.15zm.576-5.61l-.594.456zm-1.6 8.352l-.474-.581zM5.708 9.76V7.038h-1.5V9.76zM2.51 2.384l-.261-.092l-.498 1.416l.261.091zm8.428 13.866h5.302v-1.5h-5.302zm-5.23-9.212c0-.707.001-1.297-.05-1.776c-.055-.497-.171-.95-.453-1.362l-1.238.846c.09.132.16.314.199.677c.041.38.042.875.042 1.615zM2.012 3.8c.668.235 1.107.39 1.43.55c.303.148.437.268.525.397L5.205 3.9c-.284-.416-.662-.682-1.103-.899c-.42-.206-.958-.394-1.592-.617zm2.196 5.96c0 1.453.014 2.5.15 3.3c.147.854.44 1.466.985 2.042l1.089-1.032c-.32-.338-.493-.668-.595-1.263c-.11-.65-.129-1.558-.129-3.047zm6.73 4.99c-1.417 0-2.4-.002-3.141-.107c-.715-.101-1.092-.285-1.365-.573l-1.089 1.032c.594.627 1.347.9 2.243 1.026c.87.124 1.98.122 3.351.122zm-5.98-7.88h12.13v-1.5H4.959zm14.965 2.861l-.5 2.425l1.47.303l.5-2.425zM17.09 6.87c.856 0 1.61.001 2.205.067q.441.052.672.134c.161.057.187.1.174.083l1.189-.914c-.235-.306-.565-.479-.866-.584a4.6 4.6 0 0 0-1.003-.21c-.695-.077-1.543-.076-2.371-.076zm4.304 3.16c.17-.848.313-1.56.348-2.13c.037-.586-.03-1.164-.412-1.66l-1.189.914c.062.081.13.226.104.654c-.027.444-.144 1.037-.322 1.928zm-5.153 6.22c.762 0 1.401.001 1.917-.062c.535-.065 1.024-.209 1.45-.556l-.947-1.163c-.125.102-.303.184-.686.23c-.403.05-.934.051-1.734.051zm3.184-4.094c-.162.783-.27 1.303-.4 1.688c-.123.366-.239.523-.364.625l.947 1.163c.427-.348.666-.797.838-1.309c.166-.492.294-1.118.448-1.864z"
                  ></path>
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    d="M13 13v-2m0 0V9m0 2h2m-2 0h-2"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default React.memo(ProductCard);
