import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  categories: string[];
  selectedCategory: string;
  searchQuery: string;
  lastFetchParams: {
    searchQuery: string;
    category: string;
  };
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  categories: [],
  selectedCategory: "all",
  searchQuery: "",
  lastFetchParams: {
    searchQuery: "",
    category: "all",
  },
};

export const fetchProducts = createAsyncThunk<
  Product[],
  { searchQuery?: string; category?: string },
  { state: { product: ProductState } }
>(
  "products/fetch",
  async ({ searchQuery = "", category = "all" }, { getState }) => {
    const state = getState().product;

    if (
      state.lastFetchParams.searchQuery === searchQuery &&
      state.lastFetchParams.category === category &&
      state.products.length > 0
    ) {
      return state.products;
    }

    let url = "https://fakestoreapi.com/products";

    if (category && category !== "all") {
      url = `https://fakestoreapi.com/products/category/${encodeURIComponent(
        category
      )}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products");

    const data = (await res.json()) as Product[];

    if (searchQuery) {
      return data.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return data;
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    if (!res.ok) throw new Error("Failed to fetch categories");
    return (await res.json()) as string[];
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.lastFetchParams = {
          searchQuery: state.searchQuery,
          category: state.selectedCategory,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching products";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setCategory, setSearchQuery } = productSlice.actions;
export default productSlice.reducer;
