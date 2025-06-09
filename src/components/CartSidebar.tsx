"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CartItem from "./CartItem";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function CartSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { items } = useSelector((state: RootState) => state.cart);

  const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 max-[375px]:w-full w-80 bg-white h-full shadow-2xl transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 border-b border-gray-300 flex justify-between items-center">
        <h2 className="text-lg font-bold">My Cart</h2>
        <button onClick={onClose} className="cursor-pointer">
          ✕
        </button>
      </div>

      <div className="p-4 overflow-y-auto flex flex-col gap-4 h-[calc(100%-150px)]">
        {items.length === 0 ? (
          <>
            <p>Your cart is empty.</p>
            <div className="h-80 w-full">
              <DotLottieReact
                src="https://lottie.host/1fc0b6de-ca51-4755-ac2a-82d8d3a4c88a/qx3ePTYP6f.lottie"
                loop
                autoplay
              />
            </div>
          </>
        ) : (
          items.map((item) => (
            <CartItem
              key={item.product.id}
              product={item.product}
              quantity={item.quantity}
            />
          ))
        )}
      </div>

      <div className="p-4 border-t border-gray-300">
        <p className="text-sm">Total Quantity: {totalQty}</p>
        <p className="text-lg font-bold">Total: ${totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
}
