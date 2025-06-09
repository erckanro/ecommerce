"use client";

import {
  useEffect,
  useState,
  Suspense,
  lazy,
  useMemo,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchCategories,
  setSearchQuery,
} from "@/redux/productSlice";
import { RootState, AppDispatch } from "@/redux/store";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import useDebounce from "@/hooks/useDebounce";
import SearchInput from "@/components/SearchInput";
import CartIcon from "@/components/CartIcon";
import CategorySelector from "@/components/CategorySelector";

const CartSidebar = lazy(() => import("@/components/CartSidebar"));

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    products,
    loading,
    error,
    selectedCategory,
    categories,
    searchQuery,
  } = useSelector((state: RootState) => state.product);
  const cart = useSelector((state: RootState) => state.cart);
  const [hasFetched, setHasFetched] = useState(false);

  const [input, setInput] = useState(searchQuery);
  const debouncedInput = useDebounce(input, 300);

  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [categories.length, dispatch]);

  useEffect(() => {
    if (debouncedInput !== searchQuery) {
      dispatch(setSearchQuery(debouncedInput));
    }
  }, [debouncedInput, dispatch, searchQuery]);

  useEffect(() => {
    setHasFetched(false);
    dispatch(fetchProducts({ searchQuery, category: selectedCategory })).then(
      () => {
        setHasFetched(true);
      }
    );
  }, [searchQuery, selectedCategory, dispatch]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    []
  );

  const productList = useMemo(
    () =>
      products.map((product) => (
        <ProductCard key={product.id} product={product} />
      )),
    [products]
  );

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <aside className="hidden lg:block w-64 bg-slate-50 p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#497d00"
            className="size-6"
          >
            <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
          </svg>
          ECommerce
        </h2>
        <CategorySelector layout="sidebar" />
      </aside>

      <div className="flex-1 px-2 overflow-y-auto">
        <div className="bg-white sticky top-0 z-10 w-full lg:hidden flex items-center justify-center gap-2 py-2">
          <h2 className="text-2xl font-bold">ECommerce</h2>
          <CartIcon
            itemCount={cart.items.length}
            onClick={() => setCartOpen(true)}
          />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 my-6">
          <SearchInput value={input} onChange={handleSearchChange} />
          <CategorySelector layout="dropdown" />
          <div className="hidden lg:block">
            <CartIcon
              itemCount={cart.items.length}
              onClick={() => setCartOpen(true)}
            />
          </div>
        </div>

        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {hasFetched && !loading && !error && products.length === 0 && (
          <p className="text-center w-full text-gray-500">No products found.</p>
        )}

        {error && (
          <div className="h-auto w-full">
            <DotLottieReact
              src="https://lottie.host/1ec92b2f-c7ba-4de2-937e-3ca97037b1ea/v0W69Bue2h.lottie"
              loop
              autoplay
            />
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-[375px]:grid-cols-1 pb-5">
          {productList}
        </div>
      </div>

      <Suspense fallback={<div className="p-4">Loading cart...</div>}>
        <CartSidebar isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
      </Suspense>
    </div>
  );
}
