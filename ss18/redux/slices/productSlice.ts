import {
    addToCart as apiAddToCart,
    clearCart as apiClearCart,
    fetchProductById as apiFetchProductById,
    fetchProducts as apiFetchProducts,
    removeFromCart as apiRemoveFromCart,
    updateCartItem as apiUpdateCartItem,
} from "@/apis/products";
import { Product } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  product: Product;
  quantity: number;
}

type ProductsState = {
  products: Product[];
  productById: Record<string, Product | undefined>;
  loading: boolean;
  error?: string;
  cartItems: CartItem[];
  cartLoading: boolean;
  cartError?: string;
};

const initialState: ProductsState = {
  products: [],
  productById: {},
  loading: false,
  error: undefined,
  cartItems: [],
  cartLoading: false,
  cartError: undefined,
};

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const data = await apiFetchProducts();
  return data;
});

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id: string) => {
    const data = await apiFetchProductById(id);
    return data;
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    args: { product: Product; quantity?: number },
    { rejectWithValue }
  ) => {
    try {
      const quantity = args.quantity ?? 1;
      await apiAddToCart(args.product.id, quantity);
      return { product: args.product, quantity } as CartItem;
    } catch (e: any) {
      return rejectWithValue(e?.message || "Thêm vào giỏ thất bại");
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async (
    args: { productId: string; quantity: number },
    { getState, rejectWithValue }
  ) => {
    try {
      await apiUpdateCartItem(args.productId, args.quantity);
      return args;
    } catch (e: any) {
      return rejectWithValue(e?.message || "Cập nhật số lượng thất bại");
    }
  }
);

export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async (productId: string, { rejectWithValue }) => {
    try {
      await apiRemoveFromCart(productId);
      return productId;
    } catch (e: any) {
      return rejectWithValue(e?.message || "Xóa sản phẩm thất bại");
    }
  }
);

export const clearCart = createAsyncThunk("cart/clear", async () => {
  await apiClearCart();
  return true;
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error.message as string) || "Lỗi tải sản phẩm";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        const product = action.payload as Product;
        state.productById[product.id] = product;
      })
      .addCase(addToCart.pending, (state) => {
        state.cartLoading = true;
        state.cartError = undefined;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartLoading = false;
        const { product, quantity } = action.payload as CartItem;
        const existing = state.cartItems.find((c) => c.product.id === product.id);
        if (existing) {
          existing.quantity += quantity;
        } else {
          state.cartItems.push({ product, quantity });
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = (action.payload as string) || "Thêm vào giỏ thất bại";
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        const { productId, quantity } = action.payload as {
          productId: string;
          quantity: number;
        };
        const existing = state.cartItems.find((c) => c.product.id === productId);
        if (existing) {
          existing.quantity = Math.max(1, quantity);
        }
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        const productId = action.payload as string;
        state.cartItems = state.cartItems.filter(
          (c) => c.product.id !== productId
        );
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = [];
      });
  },
});

export default productSlice.reducer;

