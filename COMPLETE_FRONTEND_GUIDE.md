# 🚀 HƯỚNG DẪN HOÀN CHỈNH VIẾT LẠI FRONTEND FURNIMART

## 📋 Danh sách File Cần Tạo/Sửa (Theo Thứ Tự Ưu Tiên)

### PHASE 1: Core Setup & Types (QUAN TRỌNG NHẤT)

```
✅ 1. lib/types.ts - TypeScript Definitions
   - Các enums: UserRole, OrderStatus, ShippingStatus, DisputeType, etc
   - Interfaces: User, Product, Order, CartItem, Payment, etc
   - (Đã tồn tại, check và update nếu cần)

❌ 2. lib/endpoints.ts - API Endpoints Configuration
   - Định nghĩa tất cả API routes
   - Base URL management
   - Endpoint grouping (auth, products, orders, etc)

❌ 3. lib/apiClient.ts - HTTP Client
   - Axios instance
   - Interceptors (auth, error handling)
   - Request/Response transformation

❌ 4. lib/format.ts - Formatting Utilities
   - formatCurrency() - Định dạng tiền
   - formatDate() - Định dạng ngày
   - formatPhone() - Định dạng số điện thoại

❌ 5. lib/validation.ts - Zod Schemas
   - loginSchema
   - registerSchema
   - checkoutSchema
   - profileSchema
   - etc...

❌ 6. lib/utils.ts - General Utilities
   - cn() - ClassNames merge
   - debounce()
   - throttle()
   - delay()
   - generateId()
   - etc...
```

### PHASE 2: Services (API Communication Layer)

```
❌ 1. services/authService.ts
❌ 2. services/productService.ts
❌ 3. services/categoryService.ts
❌ 4. services/cartService.ts
❌ 5. services/orderService.ts
❌ 6. services/paymentService.ts
❌ 7. services/shippingService.ts
❌ 8. services/reviewService.ts
❌ 9. services/walletService.ts
❌ 10. services/chatService.ts
❌ 11. services/disputeService.ts
❌ 12. services/promotionService.ts
❌ 13. services/branchService.ts
❌ 14. services/userService.ts
❌ 15. services/uploadService.ts
❌ 16. services/dashboardService.ts
❌ 17. services/index.ts - Export all services
```

### PHASE 3: State Management (Zustand)

```
❌ 1. store/authStore.ts
❌ 2. store/cartStore.ts
❌ 3. store/ui.store.ts
```

### PHASE 4: Custom Hooks

```
❌ 1. hooks/useAuthInit.ts
❌ 2. hooks/useDebounce.ts
❌ 3. hooks/useToast.ts
❌ 4. hooks/useFetch.ts
❌ 5. hooks/useFilters.ts
```

### PHASE 5: UI Components

```
❌ components/ui/Button.tsx
❌ components/ui/Card.tsx
❌ components/ui/Modal.tsx
❌ components/ui/Input.tsx
❌ components/ui/Select.tsx
❌ components/ui/Badge.tsx
❌ components/ui/Pagination.tsx
❌ components/ui/Tabs.tsx
❌ components/ui/Alert.tsx
❌ components/ui/Spinner.tsx
```

### PHASE 6: Layout Components

```
❌ components/layout/Header.tsx
❌ components/layout/Footer.tsx
❌ components/layout/Sidebar.tsx
❌ components/layout/PageHeader.tsx
❌ components/layout/MainNav.tsx
```

### PHASE 7: Feature Components

```
Product:
❌ components/product/ProductCard.tsx
❌ components/product/ProductGrid.tsx
❌ components/product/ProductFilter.tsx
❌ components/product/ProductImages.tsx
❌ components/product/ProductReviews.tsx

Cart:
❌ components/cart/CartItem.tsx
❌ components/cart/CartSummary.tsx

Order:
❌ components/order/OrderCard.tsx
❌ components/order/OrderTimeline.tsx
❌ components/order/OrderList.tsx

Checkout:
❌ components/checkout/ShippingForm.tsx
❌ components/checkout/PaymentMethod.tsx
❌ components/checkout/OrderSummary.tsx

And more...
```

### PHASE 8: Pages (Customer Routes)

```
❌ app/(customer)/page.tsx - Home page
❌ app/(customer)/products/page.tsx - Products listing
❌ app/(customer)/products/[id]/page.tsx - Product detail
❌ app/(customer)/cart/page.tsx - Cart page
❌ app/(customer)/checkout/page.tsx - Checkout page
❌ app/(customer)/payment/page.tsx - Payment page
❌ app/(customer)/orders/page.tsx - Orders list
❌ app/(customer)/orders/[id]/page.tsx - Order detail
❌ app/(customer)/shipping/page.tsx - Shipping tracking
❌ app/(customer)/chat/page.tsx - Chat interface
❌ app/(customer)/wallet/page.tsx - Wallet page
❌ app/(customer)/promotions/page.tsx - Promotions
❌ app/(customer)/account/page.tsx - Account settings
❌ app/(customer)/branches/page.tsx - Branches listing
❌ app/(customer)/categories/page.tsx - Categories
```

### PHASE 9: Dashboard Pages (Seller/Admin)

```
❌ app/(dashboard)/products/page.tsx - Manage products
❌ app/(dashboard)/products/[id]/edit.tsx - Edit product
❌ app/(dashboard)/orders/page.tsx - Manage orders
❌ app/(dashboard)/analytics/page.tsx - Analytics/Dashboard
❌ app/(dashboard)/reviews/page.tsx - Manage reviews
❌ app/(dashboard)/disputes/page.tsx - Manage disputes
❌ app/(dashboard)/settings/page.tsx - Settings
```

---

## 🔧 Setup Instructions

### Step 1: Project Structure

```bash
# Create lib structure
mkdir -p frontend/lib/{config,auth,design-system}
mkdir -p frontend/services
mkdir -p frontend/store
mkdir -p frontend/hooks
mkdir -p frontend/components/{ui,layout,product,cart,order,checkout,payment,shipping,chat,wallet,review,dashboard,common}
mkdir -p frontend/app/{customer,dashboard,auth,api}
```

### Step 2: Install Dependencies

```bash
cd frontend
npm install

# Core dependencies
npm install @tanstack/react-query axios zustand zod react-hook-form

# UI & Styling (đã có)
npm install tailwindcss tailwind-merge clsx

# Icons & Utils
npm install react-icons date-fns

# Development
npm install -D typescript @types/node @types/react @types/react-dom
```

### Step 3: Environment Variables

```bash
# Create .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 4: Configure tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## 📖 Development Workflow

### 1. Start Development Server

```bash
npm run dev
# App runs on http://localhost:3000
```

### 2. Create Feature (Example: Add to Cart)

```bash
# Step 1: Create/update types (if needed)
# File: lib/types.ts
# Add CartItem interface if not exists

# Step 2: Create/update service
# File: services/cartService.ts
# Add addItem() method

# Step 3: Update store
# File: store/cartStore.ts
# Add addItem() action

# Step 4: Create component
# File: components/product/ProductCard.tsx
# Call addItem when clicked

# Step 5: Test
npm run dev
# Click "Add to Cart" button
```

### 3. Feature Testing Checklist

- [ ] Frontend compiles without errors
- [ ] Component renders correctly
- [ ] API calls made with correct endpoints
- [ ] Data received and displayed
- [ ] Error handling works
- [ ] Loading states show
- [ ] Responsive on mobile/tablet/desktop

---

## 🎯 Key Components to Build First

### Priority 1 (MUST HAVE)

1. **Button.tsx** - Base component for all interactions
2. **Card.tsx** - Base layout component
3. **Input.tsx** - Form input
4. **Header.tsx** - Navigation
5. **ProductCard.tsx** - Main product display
6. **CartItem.tsx** - Cart display

### Priority 2 (IMPORTANT)

1. **Modal.tsx** - Dialogs
2. **ProductFilter.tsx** - Filtering
3. **PaymentMethod.tsx** - Payment selection
4. **ShippingForm.tsx** - Address input
5. **OrderTimeline.tsx** - Status display

### Priority 3 (NICE TO HAVE)

1. Dashboard components
2. Chat components
3. Review components
4. Wallet components

---

## 💡 Common Implementation Patterns

### Pattern 1: Fetching Data with React Query

```typescript
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/productService";

export default function ProductsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => productService.getProducts(),
  });

  if (isLoading) return <Spinner />;
  if (error) return <Error />;

  return <div>{/* render data */}</div>;
}
```

### Pattern 2: Updating Store & Backend

```typescript
import { useCartStore } from "@/store/cartStore";
import { cartService } from "@/services/cartService";

const handleAddToCart = async (product) => {
  // Update store immediately
  useCartStore.getState().addItem(product);

  // Sync with backend
  try {
    await cartService.addItem(product.id, quantity);
  } catch (error) {
    // Rollback
    useCartStore.getState().removeItem(product.id);
  }
};
```

### Pattern 3: Form Handling with React Hook Form

```typescript
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const response = await authService.login(data.email, data.password);
    useAuthStore.getState().setAuth(response);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}
    </form>
  );
}
```

---

## 🐛 Troubleshooting

### Issue: Components not rendering

**Solution:** Check if `use client` directive is at top of file

### Issue: API calls failing

**Solution:** Check apiClient interceptors and token in cookies

### Issue: Zustand state not persisting

**Solution:** Check localStorage and persist middleware configuration

### Issue: TypeScript errors

**Solution:** Make sure types imported from lib/types.ts

---

## 📊 Progress Tracking

```
PHASE 1: Core Setup
  - [ ] types.ts
  - [ ] endpoints.ts
  - [ ] apiClient.ts
  - [ ] format.ts
  - [ ] validation.ts
  - [ ] utils.ts

PHASE 2: Services
  - [ ] All 16 services created

PHASE 3: Stores
  - [ ] authStore
  - [ ] cartStore
  - [ ] uiStore

PHASE 4: Hooks
  - [ ] All custom hooks

PHASE 5: UI Components
  - [ ] All UI primitives

PHASE 6: Layout
  - [ ] Header
  - [ ] Footer
  - [ ] Sidebar

PHASE 7: Features
  - [ ] Product features
  - [ ] Cart features
  - [ ] Order features
  - [ ] Checkout features
  - [ ] And more...

PHASE 8: Customer Pages
  - [ ] All customer routes

PHASE 9: Dashboard
  - [ ] All dashboard routes

PHASE 10: Testing & Optimization
  - [ ] E2E tests
  - [ ] Performance optimization
  - [ ] Accessibility check
```

---

## 🎓 Learning Resources

### Key Concepts

1. **Next.js App Router** - File-based routing
2. **Server vs Client Components** - `use client` directive
3. **React Query** - Data fetching and caching
4. **Zustand** - Lightweight state management
5. **TypeScript** - Type safety
6. **Tailwind CSS** - Utility-first styling

### Useful Links

- [Next.js 16 Docs](https://nextjs.org/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zod Validation](https://zod.dev)

---

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment for Production

```
NEXT_PUBLIC_API_URL=https://api.furnimart.com/api
NEXT_PUBLIC_APP_URL=https://furnimart.com
```

---

## 📞 Support

Khi gặp vấn đề:

1. Check error message trong browser console
2. Check network tab để xem API responses
3. Check Zustand devtools để debug state
4. Read the code comments
5. Check TypeScript error messages

---

## ✅ Checklist Hoàn Thành

Sau khi hoàn thành tất cả:

- [ ] Tất cả pages render correctly
- [ ] API calls working
- [ ] Forms submitting
- [ ] State management working
- [ ] Routing working
- [ ] Mobile responsive
- [ ] No console errors/warnings
- [ ] Performance optimized
- [ ] SEO optimized (if needed)

---

## 🎉 Kết Luận

Bây giờ bạn có tất cả kiến thức để viết lại frontend FurniMart hoàn chỉnh.

Các tài liệu đã tạo:

1. **FRONTEND_ARCHITECTURE.md** - Tổng quan kiến trúc
2. **FRONTEND_IMPLEMENTATION_GUIDE.md** - Code cho tất cả services
3. **STORES_AND_HOOKS_GUIDE.md** - State management & hooks
4. **COMPONENTS_AND_PAGES_GUIDE.md** - UI components & pages examples
5. **THIS FILE** - Setup & workflow guide

**Bước tiếp theo:**

1. Tạo folder structure
2. Cài dependencies
3. Bắt đầu Phase 1 (Core setup)
4. Tiếp tục từng phase theo thứ tự

Chúc bạn thành công! 🚀
