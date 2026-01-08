# 🎨 COMPONENTS & PAGES - UI IMPLEMENTATION GUIDE

## 📐 Component Structure

Mỗi component trong FurniMart nên follow cấu trúc này:

```
components/
├── ui/                          # UI Primitives (dùng lại)
│   ├── Button.tsx              # Button component
│   ├── Card.tsx                # Card container
│   ├── Modal.tsx               # Modal dialog
│   ├── Input.tsx               # Input field
│   ├── Select.tsx              # Dropdown
│   ├── Badge.tsx               # Status badge
│   ├── Pagination.tsx          # Pagination
│   └── ... (other primitives)
├── layout/                      # Layout Components
│   ├── Header.tsx              # Navigation header
│   ├── Sidebar.tsx             # Sidebar navigation
│   ├── Footer.tsx              # Footer
│   └── PageHeader.tsx          # Page title & breadcrumb
├── product/                     # Product-related
│   ├── ProductCard.tsx         # Product card
│   ├── ProductGrid.tsx         # Product grid
│   ├── ProductFilter.tsx       # Product filters
│   ├── ProductDetail.tsx       # Product detail
│   └── ProductReviews.tsx      # Product reviews section
├── cart/                        # Cart-related
│   ├── CartItem.tsx            # Cart item row
│   ├── CartSummary.tsx         # Cart total & checkout button
│   └── EmptyCart.tsx           # Empty cart message
├── order/                       # Order-related
│   ├── OrderCard.tsx           # Order summary card
│   ├── OrderTimeline.tsx       # Order status timeline
│   ├── OrderList.tsx           # List of orders
│   └── OrderDetail.tsx         # Full order details
├── checkout/                    # Checkout flow
│   ├── ShippingForm.tsx        # Shipping address form
│   ├── PaymentMethod.tsx       # Payment method selector
│   ├── OrderSummary.tsx        # Checkout summary
│   └── CheckoutFlow.tsx        # Full checkout component
├── payment/                     # Payment
│   ├── PaymentGateway.tsx      # Payment gateway integration
│   └── PaymentStatus.tsx       # Payment status display
├── shipping/                    # Shipping & tracking
│   ├── TrackingMap.tsx         # Map with tracking location
│   ├── ShippingStatus.tsx      # Shipping status display
│   └── ShippingHistory.tsx     # Shipping history timeline
├── chat/                        # Chat
│   ├── ChatWindow.tsx          # Chat message window
│   ├── MessageInput.tsx        # Message input box
│   └── ChatList.tsx            # Chat conversations list
├── wallet/                      # Wallet
│   ├── WalletBalance.tsx       # Wallet balance display
│   ├── TopupForm.tsx           # Topup form
│   └── TransactionHistory.tsx  # Transaction list
├── review/                      # Reviews
│   ├── ReviewForm.tsx          # Write review form
│   ├── ReviewCard.tsx          # Review display card
│   └── ReviewList.tsx          # List of reviews
├── dashboard/                   # Dashboard (seller/admin)
│   ├── DashboardStats.tsx      # Stats cards
│   ├── RevenueChart.tsx        # Revenue chart
│   ├── TopProductsChart.tsx    # Top products list
│   ├── OrderStatusChart.tsx    # Order status pie/bar chart
│   └── DashboardLayout.tsx     # Dashboard main layout
└── common/                      # Common components
    ├── Loading.tsx             # Loading spinner
    ├── Error.tsx               # Error message
    ├── EmptyState.tsx          # Empty state message
    └── Breadcrumb.tsx          # Breadcrumb navigation
```

---

## 🖼️ UI Component Examples

### 1. Button.tsx

```typescript
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define button variants using CVA (Class Variance Authority)
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
        danger: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-gray-300 text-gray-900 hover:bg-gray-50",
        ghost: "hover:bg-gray-100",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoading || props.disabled}
      ref={ref}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Đang xử lý...
        </>
      ) : (
        children
      )}
    </button>
  )
);

Button.displayName = "Button";
export default Button;
```

**Sử dụng:**

```tsx
<Button variant="primary" size="md" onClick={handleSubmit}>
  Thanh toán
</Button>

<Button variant="outline" size="sm">
  Hủy
</Button>

<Button variant="danger" isLoading={isLoading}>
  Xóa
</Button>
```

---

### 2. Card.tsx

```typescript
import React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-gray-200 bg-white shadow-sm p-6",
      className
    )}
    {...props}
  />
));

Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-4 pb-4 border-b", className)} {...props} />
));

CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn("text-xl font-semibold", className)} {...props} />
));

CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));

CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardContent };
```

**Sử dụng:**

```tsx
<Card>
  <CardHeader>
    <CardTitle>Thông tin đơn hàng</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Mã đơn hàng: #12345</p>
  </CardContent>
</Card>
```

---

### 3. Modal.tsx

```typescript
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className={cn(
          "bg-white rounded-lg shadow-lg w-full mx-4",
          sizeClasses[size]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        )}
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
```

**Sử dụng:**

```tsx
const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Mở Modal</Button>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Xác nhận thanh toán"
  size="md"
>
  <p>Bạn có chắc muốn thanh toán đơn hàng này?</p>
  <div className="mt-4 flex gap-2">
    <Button onClick={() => setIsOpen(false)}>Hủy</Button>
    <Button variant="primary" onClick={handleConfirm}>Xác nhận</Button>
  </div>
</Modal>
```

---

## 📄 Page Examples

### 1. Product Listing Page

```typescript
// app/(customer)/products/page.tsx

"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/productService";
import { useFilters, useDebounce } from "@/hooks";
import ProductCard from "@/components/product/ProductCard";
import ProductFilter from "@/components/product/ProductFilter";
import Pagination from "@/components/ui/Pagination";
import Loading from "@/components/common/Loading";
import EmptyState from "@/components/common/EmptyState";
import PageHeader from "@/components/layouts/PageHeader";

/**
 * Trang danh sách sản phẩm
 *
 * Chức năng:
 * - Hiển thị danh sách sản phẩm
 * - Filter theo category, giá, materials
 * - Tìm kiếm sản phẩm
 * - Pagination
 * - Sort (mới nhất, giá cao, giá thấp, trending)
 */
export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const { filters, updateFilter } = useFilters({
    categoryId: "",
    minPrice: 0,
    maxPrice: 100000000,
    search: "",
    limit: 20,
  });

  const debouncedSearch = useDebounce(filters.search, 300);

  // Fetch products with filters
  const {
    data: productsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", { ...filters, search: debouncedSearch, page }],
    queryFn: () =>
      productService.getProducts({
        ...filters,
        search: debouncedSearch,
        page,
      }),
    enabled: true,
  });

  if (error) {
    return (
      <EmptyState
        icon="error"
        title="Lỗi tải sản phẩm"
        description={(error as any).message}
      />
    );
  }

  return (
    <div>
      <PageHeader
        title="Sản phẩm"
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Sản phẩm", href: "/products" },
        ]}
      />

      <div className="flex gap-6 p-6">
        {/* Sidebar Filters */}
        <aside className="w-64">
          <ProductFilter filters={filters} onFilterChange={updateFilter} />
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          {isLoading ? (
            <Loading />
          ) : productsData?.items && productsData.items.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productsData.items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {productsData.totalPages > 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={productsData.totalPages}
                  onPageChange={setPage}
                />
              )}
            </>
          ) : (
            <EmptyState
              title="Không tìm thấy sản phẩm"
              description="Vui lòng thử lại với các filter khác"
            />
          )}
        </main>
      </div>
    </div>
  );
}
```

---

### 2. Product Detail Page

```typescript
// app/(customer)/products/[id]/page.tsx

"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { productService } from "@/services/productService";
import { cartService } from "@/services/cartService";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/useToast";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ProductImages from "@/components/product/ProductImages";
import ProductReviews from "@/components/product/ProductReviews";
import Loading from "@/components/common/Loading";
import { formatCurrency } from "@/lib/format";

/**
 * Trang chi tiết sản phẩm
 *
 * Chức năng:
 * - Hiển thị ảnh sản phẩm (gallery với zoom)
 * - Thông tin chi tiết sản phẩm
 * - Rating & reviews
 * - Thêm vào giỏ hàng
 * - Mua ngay
 * - Sản phẩm liên quan
 */
export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const toast = useToast();
  const { addItem } = useCartStore();

  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Fetch product details
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => productService.getProduct(productId),
  });

  // Fetch related products
  const { data: relatedProducts } = useQuery({
    queryKey: ["products", { categoryId: product?.categoryId, limit: 4 }],
    queryFn: () =>
      productService.getProducts({
        categoryId: product?.categoryId,
        limit: 4,
      }),
    enabled: !!product?.categoryId,
  });

  const handleAddToCart = async () => {
    if (!product) return;

    setIsAddingToCart(true);
    try {
      // Add to local store immediately for better UX
      addItem({
        id: product.id,
        productId: product.id,
        product,
        quantity,
        price: product.price,
      });

      // Sync with backend
      await cartService.addItem(product.id, quantity);

      toast.success(`Đã thêm ${quantity} sản phẩm vào giỏ`);
      setQuantity(1);
    } catch (error) {
      toast.error("Thêm vào giỏ thất bại");
      // Rollback
      useCartStore.getState().removeItem(product.id);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  if (isLoading) return <Loading />;
  if (error || !product) return <p>Sản phẩm không tìm thấy</p>;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <ProductImages images={product.images} />

        {/* Product Info */}
        <Card>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">
              {"★".repeat(Math.round(product.rating || 0))}
            </div>
            <span>({product.reviewCount} đánh giá)</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <p className="text-3xl font-bold text-blue-600">
              {formatCurrency(product.price)}
            </p>
            {product.discount && (
              <p className="text-sm text-gray-500 line-through">
                {formatCurrency(product.price + product.discount)}
              </p>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Specs */}
          <div className="mb-6 space-y-2">
            <p>
              <strong>Chất liệu:</strong> {product.materials?.join(", ")}
            </p>
            <p>
              <strong>Màu sắc:</strong> {product.colors?.join(", ")}
            </p>
            {product.dimensions && (
              <p>
                <strong>Kích thước:</strong>{" "}
                {JSON.stringify(product.dimensions)}
              </p>
            )}
            <p>
              <strong>Tồn kho:</strong> {product.stock} sản phẩm
            </p>
          </div>

          {/* Quantity & Actions */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center border rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2"
              >
                −
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2"
              >
                +
              </button>
            </div>
            <span className="text-sm text-gray-600">
              {product.stock} sản phẩm có sẵn
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleAddToCart}
              isLoading={isAddingToCart}
              disabled={product.stock === 0}
            >
              🛒 Thêm vào giỏ
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleBuyNow}
              isLoading={isAddingToCart}
              disabled={product.stock === 0}
            >
              Mua ngay
            </Button>
          </div>
        </Card>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <ProductReviews productId={productId} />
      </div>

      {/* Related Products */}
      {relatedProducts?.items && relatedProducts.items.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

---

### 3. Cart Page

```typescript
// app/(customer)/cart/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { cartService } from "@/services/cartService";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyState from "@/components/common/EmptyState";
import { formatCurrency } from "@/lib/format";

/**
 * Trang giỏ hàng
 *
 * Chức năng:
 * - Hiển thị danh sách sản phẩm trong giỏ
 * - Cập nhật số lượng
 * - Xóa sản phẩm
 * - Tính tổng tiền
 * - Áp dụng mã giảm giá
 * - Checkout
 */
export default function CartPage() {
  const router = useRouter();
  const { items, totalAmount, updateQuantity, removeItem, setCart } =
    useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isCheckingPromo, setIsCheckingPromo] = useState(false);

  // Sync with backend on load
  const { data: backendCart } = useQuery({
    queryKey: ["cart"],
    queryFn: () => cartService.getCart(),
  });

  useEffect(() => {
    if (backendCart && backendCart.length > 0) {
      setCart(backendCart);
    }
  }, [backendCart, setCart]);

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
    if (quantity > 0) {
      await cartService.updateQuantity(productId, quantity);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    removeItem(productId);
    await cartService.removeItem(productId);
  };

  const handleApplyPromo = async () => {
    if (!promoCode) return;
    setIsCheckingPromo(true);
    try {
      // Call promotion service to validate and get discount
      // const result = await promotionService.applyPromotion({ ...});
      // setDiscount(result.discountAmount);
    } catch (error) {
      console.error("Promo code invalid");
    } finally {
      setIsCheckingPromo(false);
    }
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (items.length === 0) {
    return (
      <EmptyState
        title="Giỏ hàng trống"
        description="Hãy thêm sản phẩm vào giỏ"
        actionLabel="Tiếp tục mua sắm"
        onAction={() => router.push("/products")}
      />
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem
              key={item.productId}
              item={item}
              onQuantityChange={(qty) =>
                handleUpdateQuantity(item.productId, qty)
              }
              onRemove={() => handleRemoveItem(item.productId)}
            />
          ))}
        </div>

        {/* Sidebar - Promo & Summary */}
        <div className="space-y-6">
          {/* Promo Code */}
          <Card>
            <h3 className="font-semibold mb-4">Mã giảm giá</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập mã giảm giá"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-3 py-2 border rounded"
              />
              <Button
                size="sm"
                onClick={handleApplyPromo}
                isLoading={isCheckingPromo}
              >
                Áp dụng
              </Button>
            </div>
            {discount > 0 && (
              <p className="mt-2 text-green-600">
                Tiết kiệm: -{formatCurrency(discount)}
              </p>
            )}
          </Card>

          {/* Summary */}
          <CartSummary
            subtotal={totalAmount}
            discount={discount}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
}
```

---

## 🎯 Component Best Practices

1. **Always use TypeScript** - Type safety is important
2. **Keep components small** - Single responsibility principle
3. **Use custom hooks** - Extract logic into hooks
4. **Memoize expensive components** - Use React.memo() when needed
5. **Error boundaries** - Wrap pages with error boundaries
6. **Loading states** - Always show loading while fetching
7. **Accessibility** - Use semantic HTML, ARIA labels
8. **Responsive design** - Mobile-first approach

---

## 📦 Component Export Pattern

```typescript
// components/product/index.ts
export { default as ProductCard } from "./ProductCard";
export { default as ProductGrid } from "./ProductGrid";
export { default as ProductFilter } from "./ProductFilter";
export { default as ProductDetail } from "./ProductDetail";
export { default as ProductReviews } from "./ProductReviews";
```

**Import:**

```typescript
import { ProductCard, ProductGrid, ProductFilter } from "@/components/product";
```

---

## 🚀 Next Steps

1. Bắt đầu xây dựng **UI Components** (Button, Card, Modal, Input, etc)
2. Xây dựng **Layout Components** (Header, Sidebar, Footer)
3. Xây dựng **Feature Components** (Product, Cart, Order, etc)
4. Xây dựng **Pages** cho customer routes
5. Xây dựng **Dashboard Pages** cho seller/admin
6. Test tất cả components
7. Optimize performance
