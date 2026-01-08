# 📦 ZUSTAND STORES & CUSTOM HOOKS

## 1️⃣ authStore.ts - Quản lý Authentication State

```typescript
/**
 * Auth Store
 *
 * Lưu trữ:
 * - Thông tin người dùng hiện tại
 * - Access token & Refresh token
 * - Trạng thái xác thực
 * - Vai trò người dùng
 * - ID chi nhánh (nếu là employee)
 *
 * Dữ liệu này được persist vào localStorage để khôi phục khi refresh page
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, UserRole, AuthResponse } from "@/lib/types";

interface AuthState {
  // State
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  branchId: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setAuth: (authData: AuthResponse) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      role: null,
      branchId: null,
      isLoading: false,
      error: null,

      // Action: Thiết lập toàn bộ auth data (sau login)
      setAuth: (authData: AuthResponse) => {
        set({
          user: authData.user,
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken,
          isAuthenticated: true,
          role: authData.user.role,
          branchId: authData.user.branchId || null,
          error: null,
        });

        // Lưu tokens vào cookies để apiClient có thể sử dụng
        if (typeof document !== "undefined") {
          document.cookie = `accessToken=${authData.accessToken}; path=/; max-age=3600; SameSite=Strict`;
          document.cookie = `refreshToken=${authData.refreshToken}; path=/; max-age=604800; SameSite=Strict`;
          document.cookie = `role=${authData.user.role}; path=/; max-age=3600; SameSite=Strict`;
          if (authData.user.branchId) {
            document.cookie = `branchId=${authData.user.branchId}; path=/; max-age=3600; SameSite=Strict`;
          }
        }
      },

      // Action: Cập nhật tokens
      setTokens: (accessToken: string, refreshToken: string) => {
        set({
          accessToken,
          refreshToken,
          isAuthenticated: !!accessToken && !!refreshToken,
        });

        if (typeof document !== "undefined") {
          document.cookie = `accessToken=${accessToken}; path=/; max-age=3600; SameSite=Strict`;
          document.cookie = `refreshToken=${refreshToken}; path=/; max-age=604800; SameSite=Strict`;
        }
      },

      // Action: Cập nhật thông tin người dùng
      setUser: (user: User) => {
        set({
          user,
          role: user.role,
          branchId: user.branchId || null,
        });
      },

      // Action: Thiết lập loading state
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      // Action: Thiết lập error message
      setError: (error: string | null) => {
        set({ error });
      },

      // Action: Logout - xóa tất cả auth data
      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          role: null,
          branchId: null,
          error: null,
        });

        // Xóa cookies
        if (typeof document !== "undefined") {
          document.cookie =
            "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie =
            "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie =
            "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie =
            "branchId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
      },
    }),
    {
      name: "auth-storage", // Key trong localStorage
      partialize: (state) => ({
        // Chỉ persist những state quan trọng
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        role: state.role,
        branchId: state.branchId,
      }),
    }
  )
);
```

**Cách sử dụng:**

```typescript
// Trong component login
import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/authService";

const handleLogin = async (email: string, password: string) => {
  const { setAuth, setError } = useAuthStore();
  try {
    const response = await authService.login(email, password);
    setAuth(response); // Tự động set user, tokens, etc
    router.push("/");
  } catch (error) {
    setError("Đăng nhập thất bại");
  }
};

// Trong component header để kiểm tra user đã login
const Header = () => {
  const { user, isAuthenticated, logout } = useAuthStore();

  if (!isAuthenticated) return <LoginLink />;

  return (
    <div>
      <span>Xin chào {user?.name}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

---

## 2️⃣ cartStore.ts - Quản lý Shopping Cart State

```typescript
/**
 * Cart Store
 *
 * Lưu trữ:
 * - Danh sách sản phẩm trong giỏ
 * - Số lượng từng sản phẩm
 * - Tổng tiền
 *
 * Note: Dữ liệu thực cũng được lưu trên backend
 * Store này chỉ dùng để hiển thị nhanh, backend là source of truth
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/lib/types";

interface CartState {
  // State
  items: CartItem[];
  totalAmount: number;

  // Actions
  setCart: (items: CartItem[]) => void;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  recalculateTotal: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      totalAmount: 0,

      // Action: Thiết lập giỏ từ backend
      setCart: (items: CartItem[]) => {
        set({ items });
        get().recalculateTotal();
      },

      // Action: Thêm sản phẩm vào giỏ
      addItem: (item: CartItem) => {
        const items = get().items;
        const existingItem = items.find((i) => i.productId === item.productId);

        if (existingItem) {
          // Nếu đã có sản phẩm này, tăng số lượng
          existingItem.quantity += item.quantity;
        } else {
          // Nếu chưa có, thêm mới
          items.push(item);
        }

        set({ items: [...items] });
        get().recalculateTotal();
      },

      // Action: Xóa sản phẩm khỏi giỏ
      removeItem: (productId: string) => {
        const items = get().items.filter(
          (item) => item.productId !== productId
        );
        set({ items });
        get().recalculateTotal();
      },

      // Action: Cập nhật số lượng sản phẩm
      updateQuantity: (productId: string, quantity: number) => {
        const items = get().items;
        const item = items.find((i) => i.productId === productId);

        if (!item) return;

        if (quantity <= 0) {
          // Xóa nếu số lượng <= 0
          get().removeItem(productId);
        } else {
          // Cập nhật số lượng
          item.quantity = quantity;
          set({ items: [...items] });
          get().recalculateTotal();
        }
      },

      // Action: Xóa toàn bộ giỏ
      clearCart: () => {
        set({ items: [], totalAmount: 0 });
      },

      // Action: Tính lại tổng tiền
      recalculateTotal: () => {
        const items = get().items;
        const total = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        set({ totalAmount: total });
      },
    }),
    {
      name: "cart-storage", // Key trong localStorage
    }
  )
);
```

**Cách sử dụng:**

```typescript
// Trong product detail page
const { addItem } = useCartStore();

const handleAddToCart = (product: Product) => {
  addItem({
    id: product.id,
    productId: product.id,
    product,
    quantity: 1,
    price: product.price,
  });

  // Cũng gửi đến backend
  cartService.addItem(product.id, 1).catch((error) => {
    removeItem(product.id); // Rollback nếu backend error
  });
};

// Trong cart page
const Cart = () => {
  const { items, totalAmount, updateQuantity, removeItem } = useCartStore();

  return (
    <div>
      {items.map((item) => (
        <CartItemRow
          key={item.productId}
          item={item}
          onQuantityChange={(qty) => updateQuantity(item.productId, qty)}
          onRemove={() => removeItem(item.productId)}
        />
      ))}
      <p>Tổng: {formatCurrency(totalAmount)}</p>
    </div>
  );
};
```

---

## 3️⃣ uiStore.ts - Quản lý UI State

```typescript
/**
 * UI Store
 *
 * Lưu trữ:
 * - Loading states
 * - Modal states (open/close)
 * - Sidebar states
 * - Notifications
 * - Theme preferences
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  // Loading
  isPageLoading: boolean;
  setPageLoading: (loading: boolean) => void;

  // Modals
  openModals: Set<string>;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  closeAllModals: () => void;
  isModalOpen: (modalId: string) => boolean;

  // Sidebar
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  // Notifications
  notifications: Array<{
    id: string;
    type: "success" | "error" | "info" | "warning";
    message: string;
    duration?: number;
  }>;
  addNotification: (
    message: string,
    type?: "success" | "error" | "info" | "warning"
  ) => void;
  removeNotification: (id: string) => void;

  // Theme
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;

  // Filter panel
  isFilterPanelOpen: boolean;
  setFilterPanelOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // Loading
      isPageLoading: false,
      setPageLoading: (loading: boolean) => set({ isPageLoading: loading }),

      // Modals
      openModals: new Set(),
      openModal: (modalId: string) => {
        const openModals = new Set(get().openModals);
        openModals.add(modalId);
        set({ openModals });
      },
      closeModal: (modalId: string) => {
        const openModals = new Set(get().openModals);
        openModals.delete(modalId);
        set({ openModals });
      },
      closeAllModals: () => {
        set({ openModals: new Set() });
      },
      isModalOpen: (modalId: string) => {
        return get().openModals.has(modalId);
      },

      // Sidebar
      isSidebarOpen: false,
      toggleSidebar: () => set({ isSidebarOpen: !get().isSidebarOpen }),
      setSidebarOpen: (open: boolean) => set({ isSidebarOpen: open }),

      // Notifications
      notifications: [],
      addNotification: (message: string, type = "info") => {
        const id = `${Date.now()}-${Math.random()}`;
        const notifications = [
          ...get().notifications,
          { id, message, type: type as any, duration: 3000 },
        ];
        set({ notifications });

        // Auto remove after duration
        setTimeout(() => {
          get().removeNotification(id);
        }, 3000);
      },
      removeNotification: (id: string) => {
        const notifications = get().notifications.filter((n) => n.id !== id);
        set({ notifications });
      },

      // Theme
      theme: "light",
      setTheme: (theme: "light" | "dark") => {
        set({ theme });
        // Apply theme to document
        if (typeof document !== "undefined") {
          if (theme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
      },

      // Filter panel
      isFilterPanelOpen: false,
      setFilterPanelOpen: (open: boolean) => set({ isFilterPanelOpen: open }),
    }),
    {
      name: "ui-storage",
      partialize: (state) => ({
        theme: state.theme,
        isSidebarOpen: state.isSidebarOpen,
      }),
    }
  )
);
```

---

## 4️⃣ Custom Hooks

### useAuthInit.ts - Khôi phục Auth khi Page Load

```typescript
/**
 * Hook này chạy khi app khởi động
 * Để khôi phục auth data từ localStorage/cookies
 */

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/authService";

export const useAuthInit = () => {
  const { setUser, setAuth } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Kiểm tra xem có token trong cookie không
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("accessToken="))
          ?.split("=")[1];

        if (token) {
          // Lấy user info
          const user = await authService.getMe();
          setUser(user);
        }
      } catch (error) {
        console.error("Auth init failed:", error);
        // Logout nếu token invalid
        useAuthStore.getState().logout();
      }
    };

    initAuth();
  }, [setUser, setAuth]);
};
```

**Sử dụng trong RootLayout hoặc providers:**

```typescript
export function Providers({ children }: { children: React.ReactNode }) {
  useAuthInit(); // Gọi hook này để khôi phục auth

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

### useDebounce.ts - Debounce Hook

```typescript
/**
 * Hook để delay việc gọi API khi user đang gõ
 * Ví dụ: Tìm kiếm sản phẩm, user gõ "ghế" -> gọi API
 * Sau 300ms nếu không gõ nữa, mới gọi API
 */

import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
```

**Sử dụng:**

```typescript
const [searchQuery, setSearchQuery] = useState("");
const debouncedQuery = useDebounce(searchQuery, 300);

// Gọi API mỗi khi debouncedQuery thay đổi
const { data } = useQuery({
  queryKey: ["products", debouncedQuery],
  queryFn: () => productService.searchProducts(debouncedQuery),
  enabled: debouncedQuery.length > 0,
});
```

### useToast.ts - Toast Notification Hook

```typescript
/**
 * Custom hook để show toast notifications
 * Thay thế việc import react-toastify ở tất cả component
 */

import { useUIStore } from "@/store/ui.store";

export const useToast = () => {
  const { addNotification } = useUIStore();

  return {
    success: (message: string) => addNotification(message, "success"),
    error: (message: string) => addNotification(message, "error"),
    info: (message: string) => addNotification(message, "info"),
    warning: (message: string) => addNotification(message, "warning"),
  };
};
```

**Sử dụng:**

```typescript
const toast = useToast();

const handleAddToCart = () => {
  cartService.addItem(productId, quantity);
  toast.success("Thêm vào giỏ thành công!");
};
```

### useFetch.ts - Fetch Data Hook

```typescript
/**
 * Generic hook để fetch data từ API
 * Kết hợp với React Query
 */

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useFetch = <T>(
  queryKey: any[],
  queryFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
};
```

### useFilters.ts - Filter State Hook

```typescript
/**
 * Hook để quản lý filter state
 * Dùng cho pages như Products, Orders
 */

import { useState, useCallback } from "react";

export const useFilters = (initialFilters?: Record<string, any>) => {
  const [filters, setFilters] = useState(initialFilters || {});

  const updateFilter = useCallback((key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const updateFilters = useCallback((newFilters: Record<string, any>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  return {
    filters,
    updateFilter,
    updateFilters,
    clearFilters,
  };
};
```

**Sử dụng:**

```typescript
const { filters, updateFilter } = useFilters();

const { data } = useQuery({
  queryKey: ["products", filters],
  queryFn: () => productService.getProducts(filters),
});

return (
  <>
    <CategoryFilter
      value={filters.categoryId}
      onChange={(value) => updateFilter("categoryId", value)}
    />
  </>
);
```

---

## Summary

**Zustand Stores:**

- `authStore` - User login, tokens, role
- `cartStore` - Shopping cart items
- `uiStore` - UI states, modals, notifications

**Custom Hooks:**

- `useAuthInit` - Restore auth on app load
- `useDebounce` - Debounce input for API calls
- `useToast` - Show notifications
- `useFetch` - Generic fetch hook
- `useFilters` - Manage filter states

Tất cả này sẽ được import và sử dụng trong components & pages.
