"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { decreaseQty, increaseQty, removeFromCart } from "@/redux/cartSlice";
import { Product } from "@/types";
import Modal from "./Modal";
import toast from "react-hot-toast";

export default function CartItem({
  product,
  quantity,
}: {
  product: Product;
  quantity: number;
}) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const confirmRemove = () => {
    dispatch(removeFromCart(product.id));
    toast("Removed from cart!", {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="red"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      ),
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between border-b border-lime-500 border-dashed pt-2 pb-6">
        <div className="flex-1">
          <p className="text-sm font-medium">{product.title}</p>
          <p className="text-xs text-gray-500">
            ${product.price} x {quantity}
          </p>
          <div className="flex gap-1 mt-1">
            <button
              onClick={() => dispatch(decreaseQty(product.id))}
              className="px-2 bg-gray-200 cursor-pointer"
            >
              -
            </button>
            <button
              onClick={() => dispatch(increaseQty(product.id))}
              className="px-2 bg-gray-200 cursor-pointer"
            >
              +
            </button>
            <button
              onClick={openModal}
              className="ml-2 text-red-500 text-sm cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
        <img
          src={product.image}
          className="w-14 h-14 object-contain ml-2"
          alt={product.title}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Confirm Removal">
        <p>
          Do you want to remove <strong>{product.title}</strong> from your cart?
        </p>
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 border rounded hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={confirmRemove}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
          >
            Remove
          </button>
        </div>
      </Modal>
    </>
  );
}
