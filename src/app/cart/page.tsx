"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CartItem from "@/components/CartItem";

export default function CartPage() {
  const { items } = useSelector((state: RootState) => state.cart);

  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.product.id}
                product={item.product}
                quantity={item.quantity}
              />
            ))}
          </div>

          <div className="mt-8 border-t pt-4">
            <p className="text-sm text-gray-600">Total Quantity: {totalQty}</p>
            <p className="text-xl font-semibold">
              Total: ${totalAmount.toFixed(2)}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
