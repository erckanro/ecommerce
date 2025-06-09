"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { setCategory } from "@/redux/productSlice";

interface CategorySelectorProps {
  layout: "sidebar" | "dropdown";
}

export default function CategorySelector({ layout }: CategorySelectorProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, selectedCategory } = useSelector(
    (state: RootState) => state.product
  );

  if (layout === "dropdown") {
    return (
      <select
        value={selectedCategory}
        onChange={(e) => dispatch(setCategory(e.target.value))}
        className="w-full md:w-1/2 px-4 py-2 border-2 border-lime-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-600 placeholder-gray-400 transition lg:hidden"
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
    );
  }

  // Sidebar radio buttons
  return (
    <div className="space-y-2">
      <h3 className="font-semibold mb-2">Categories</h3>

      {["all", ...categories].map((cat) => {
        const isSelected = selectedCategory === cat;
        const label =
          cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1);

        return (
          <label
            key={cat}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="radio"
              value={cat}
              checked={isSelected}
              onChange={(e) => dispatch(setCategory(e.target.value))}
              className="hidden"
            />
            <span
              className={`w-5 h-5 rounded border-2 flex items-center justify-center
              ${isSelected ? "bg-lime-500 border-lime-600" : "border-gray-400"}
            `}
            >
              {isSelected && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8.25 8.25a1 1 0 01-1.414 0l-4.25-4.25a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
            <span>{label}</span>
          </label>
        );
      })}
    </div>
  );
}
