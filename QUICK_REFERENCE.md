# 📚 QUICK REFERENCE - FURNIMART FRONTEND

## 🗂️ File Organization

```
📦 frontend/
├── 📂 lib/                          # Utilities & Helpers
│   ├── types.ts                     # TypeScript types (đã có)
│   ├── endpoints.ts                 # API endpoints
│   ├── apiClient.ts                 # Axios config
│   ├── format.ts                    # formatCurrency, formatDate, etc
│   ├── validation.ts                # Zod schemas
│   ├── utils.ts                     # cn(), debounce, etc
│   ├── logger.ts                    # Logging utility
│   └── 📂 config/
│       ├── routes.ts                # Route constants
│       └── config.ts                # App config
│
├── 📂 services/                     # API Communication
│   ├── authService.ts               # Auth (login, register, logout)
│   ├── productService.ts            # Products CRUD
│   ├── categoryService.ts           # Categories
│   ├── cartService.ts               # Cart operations
│   ├── orderService.ts              # Orders CRUD
│   ├── paymentService.ts            # Payment methods
│   ├── shippingService.ts           # Shipping tracking
│   ├── reviewService.ts             # Product reviews
│   ├── walletService.ts             # Wallet operations
│   ├── chatService.ts               # Chat messaging
│   ├── disputeService.ts            # Dispute management
│   ├── promotionService.ts          # Promotions/discounts
│   ├── branchService.ts             # Branch management
│   ├── userService.ts               # User profile
│   ├── uploadService.ts             # File uploads
│   ├── dashboardService.ts          # Dashboard stats
│   ├── settingsService.ts           # Settings
│   ├── warehouseService.ts          # Inventory
│   └── index.ts                     # Export all
│
├── 📂 store/                        # Zustand State
│   ├── authStore.ts                 # Auth state (user, tokens)
│   ├── cartStore.ts                 # Cart state (items, total)
│   └── ui.store.ts                  # UI state (modals, notifications)
│
├── 📂 hooks/                        # Custom React Hooks
│   ├── useAuthInit.ts               # Init auth on load
│   ├── useDebounce.ts               # Debounce hook
│   ├── useToast.ts                  # Show notifications
│   ├── useFetch.ts                  # Fetch data
│   └── useFilters.ts                # Manage filters
│
├── 📂 components/                   # React Components
│   ├── 📂 ui/                       # UI Primitives
│   │   ├── Button.tsx               # Button
│   │   ├── Card.tsx                 # Card/Container
│   │   ├── Modal.tsx                # Dialog/Modal
│   │   ├── Input.tsx                # Text input
│   │   ├── Select.tsx               # Dropdown
│   │   ├── Badge.tsx                # Status badge
│   │   ├── Pagination.tsx           # Pagination
│   │   ├── Tabs.tsx                 # Tab component
│   │   ├── Alert.tsx                # Alert message
│   │   └── Spinner.tsx              # Loading spinner
│   │
│   ├── 📂 layout/                   # Layout Components
│   │   ├── Header.tsx               # Top navigation
│   │   ├── Footer.tsx               # Bottom footer
│   │   ├── Sidebar.tsx              # Side navigation
│   │   ├── PageHeader.tsx           # Page title/breadcrumb
│   │   └── MainNav.tsx              # Main navigation
│   │
│   ├── 📂 product/                  # Product Components
│   │   ├── ProductCard.tsx          # Product card
│   │   ├── ProductGrid.tsx          # Products grid
│   │   ├── ProductFilter.tsx        # Filter sidebar
│   │   ├── ProductImages.tsx        # Image gallery
│   │   ├── ProductDetail.tsx        # Full product info
│   │   └── ProductReviews.tsx       # Reviews section
│   │
│   ├── 📂 cart/                     # Cart Components
│   │   ├── CartItem.tsx             # Cart item row
│   │   ├── CartSummary.tsx          # Total & checkout
│   │   └── EmptyCart.tsx            # Empty state
│   │
│   ├── 📂 order/                    # Order Components
│   │   ├── OrderCard.tsx            # Order summary
│   │   ├── OrderTimeline.tsx        # Status timeline
│   │   ├── OrderList.tsx            # Orders list
│   │   └── OrderDetail.tsx          # Full details
│   │
│   ├── 📂 checkout/                 # Checkout Components
│   │   ├── ShippingForm.tsx         # Address form
│   │   ├── PaymentMethod.tsx        # Payment selector
│   │   ├── OrderSummary.tsx         # Checkout summary
│   │   └── CheckoutFlow.tsx         # Full flow
│   │
│   ├── 📂 payment/                  # Payment Components
│   │   ├── PaymentGateway.tsx       # Payment integration
│   │   └── PaymentStatus.tsx        # Status display
│   │
│   ├── 📂 shipping/                 # Shipping Components
│   │   ├── TrackingMap.tsx          # Map display
│   │   ├── ShippingStatus.tsx       # Status display
│   │   └── ShippingHistory.tsx      # History timeline
│   │
│   ├── 📂 chat/                     # Chat Components
│   │   ├── ChatWindow.tsx           # Chat messages
│   │   ├── MessageInput.tsx         # Input box
│   │   └── ChatList.tsx             # Conversations
│   │
│   ├── 📂 wallet/                   # Wallet Components
│   │   ├── WalletBalance.tsx        # Balance display
│   │   ├── TopupForm.tsx            # Topup form
│   │   └── TransactionHistory.tsx   # Transactions
│   │
│   ├── 📂 review/                   # Review Components
│   │   ├── ReviewForm.tsx           # Write review
│   │   ├── ReviewCard.tsx           # Review display
│   │   └── ReviewList.tsx           # Reviews list
│   │
│   ├── 📂 dashboard/                # Dashboard Components
│   │   ├── DashboardStats.tsx       # Stats cards
│   │   ├── RevenueChart.tsx         # Revenue chart
│   │   ├── TopProductsChart.tsx     # Top products
│   │   ├── OrderStatusChart.tsx     # Order status chart
│   │   └── DashboardLayout.tsx      # Main layout
│   │
│   └── 📂 common/                   # Common Components
│       ├── Loading.tsx              # Loading state
│       ├── Error.tsx                # Error state
│       ├── EmptyState.tsx           # Empty state
│       └── Breadcrumb.tsx           # Breadcrumb
│
├── 📂 app/                          # Next.js App Router
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Home page
│   ├── globals.css                  # Global styles
│   ├── providers.tsx                # Context providers
│   │
│   ├── 📂 (customer)/               # Customer routes
│   │   ├── layout.tsx               # Customer layout
│   │   ├── page.tsx                 # Home
│   │   ├── 📂 products/
│   │   │   ├── page.tsx             # Products listing
│   │   │   └── [id]/
│   │   │       └── page.tsx         # Product detail
│   │   ├── 📂 cart/
│   │   │   └── page.tsx             # Cart page
│   │   ├── 📂 checkout/
│   │   │   └── page.tsx             # Checkout
│   │   ├── 📂 payment/
│   │   │   └── page.tsx             # Payment
│   │   ├── 📂 orders/
│   │   │   ├── page.tsx             # Orders list
│   │   │   └── [id]/
│   │   │       ├── page.tsx         # Order detail
│   │   │       └── review.tsx       # Write review
│   │   ├── 📂 shipping/
│   │   │   └── page.tsx             # Tracking
│   │   ├── 📂 chat/
│   │   │   └── page.tsx             # Chat
│   │   ├── 📂 wallet/
│   │   │   └── page.tsx             # Wallet
│   │   ├── 📂 promotions/
│   │   │   └── page.tsx             # Promotions
│   │   ├── 📂 account/
│   │   │   └── page.tsx             # Account settings
│   │   ├── 📂 branches/
│   │   │   ├── page.tsx             # Branches list
│   │   │   └── [id]/
│   │   │       └── page.tsx         # Branch detail
│   │   └── 📂 categories/
│   │       └── page.tsx             # Categories
│   │
│   ├── 📂 (dashboard)/              # Dashboard routes
│   │   ├── layout.tsx               # Dashboard layout
│   │   ├── 📂 products/
│   │   │   ├── page.tsx             # Products list
│   │   │   ├── [id]/
│   │   │   │   └── edit.tsx         # Edit product
│   │   │   └── new.tsx              # Create product
│   │   ├── 📂 orders/
│   │   │   ├── page.tsx             # Orders list
│   │   │   └── [id]/
│   │   │       └── page.tsx         # Order detail
│   │   ├── 📂 analytics/
│   │   │   └── page.tsx             # Dashboard/Analytics
│   │   ├── 📂 reviews/
│   │   │   └── page.tsx             # Reviews management
│   │   ├── 📂 disputes/
│   │   │   ├── page.tsx             # Disputes list
│   │   │   └── [id]/
│   │   │       └── page.tsx         # Dispute detail
│   │   └── 📂 settings/
│   │       └── page.tsx             # Settings
│   │
│   ├── 📂 auth/                     # Auth pages
│   │   ├── login/
│   │   │   └── page.tsx             # Login page
│   │   ├── register/
│   │   │   └── page.tsx             # Register page
│   │   └── reset-password/
│   │       └── page.tsx             # Password reset
│   │
│   └── 📂 api/                      # API routes (if needed)
│       ├── auth/
│       │   └── callback.ts          # OAuth callback
│       └── webhooks/
│           └── stripe.ts            # Stripe webhook
│
├── 📂 public/                       # Static files
│   └── images/
│       ├── logo.png
│       ├── hero.jpg
│       └── ...
│
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── tailwind.config.js               # Tailwind config
├── next.config.ts                   # Next.js config
├── .env.local                       # Environment variables
└── README.md                        # Project docs
```

---

## 🔑 Key Files Explained

### lib/types.ts

Định nghĩa tất cả TypeScript types và interfaces. Đây là "single source of truth" cho type safety.

**Exports:**

- Enums: `UserRole`, `OrderStatus`, `ShippingStatus`, `DisputeType`, `PaymentMethod`
- Interfaces: `User`, `Product`, `Order`, `CartItem`, `Payment`, etc

### services/\*.ts

Gọi backend API, format request/response, xử lý errors.

**Pattern:**

```typescript
export const serviceNameService = {
  methodName: async (params) => {
    const response =
      (await apiClient.get) / post / patch / delete (endpoint, data);
    return response.data;
  },
};
```

### store/\*.ts

Zustand stores - lưu trữ state toàn bộ app.

**Pattern:**

```typescript
const useStore = create((set, get) => ({
  // State
  value: null,

  // Actions
  setValue: (value) => set({ value }),
}));
```

### components/\*.tsx

React components - UI và logic hiển thị.

**Pattern:**

```typescript
interface Props {
  // Props
}

export default function ComponentName({ }: Props) {
  // Logic
  return (
    // JSX
  );
}
```

### app/\*_/_.tsx

Pages - routes/URLs của app.

**Pattern:**

```typescript
'use client'; // Nếu cần client-side logic

export default function PageName() {
  // Page logic
  return (
    // Page content
  );
}
```

---

## 🚦 Common Workflows

### Adding New Feature

1. **Define types** → `lib/types.ts`
2. **Create service** → `services/featureService.ts`
3. **Add store** (if needed) → `store/featureStore.ts`
4. **Create components** → `components/feature/*.tsx`
5. **Create pages** → `app/(customer|dashboard)/feature/`

### Fetching Data

```typescript
// Simple fetch
const { data, isLoading } = useQuery({
  queryKey: ["items"],
  queryFn: () => itemService.getItems(),
});

// With filters
const [filters, setFilters] = useState({});
const { data } = useQuery({
  queryKey: ["items", filters],
  queryFn: () => itemService.getItems(filters),
});
```

### Updating Store & API

```typescript
// Update store immediately, sync with API
const updateItem = async (id, value) => {
  store.getState().updateItem(id, value); // Optimistic update

  try {
    await service.updateItem(id, value); // API call
  } catch (error) {
    store.getState().updateItem(id, originalValue); // Rollback
  }
};
```

### Form Submission

```typescript
const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});

const onSubmit = async (data) => {
  try {
    const result = await service.create(data);
    toast.success("Thành công");
    navigate("/success");
  } catch (error) {
    toast.error(error.message);
  }
};

return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
```

---

## 🎨 Styling Guide

### Using Tailwind CSS

```typescript
// Classes
<div className="p-6 bg-blue-600 text-white rounded-lg">

// Responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Utilities
<button className={cn('px-4 py-2', isActive && 'bg-blue-600')}>
```

### Using Tailwind Merge (cn)

```typescript
import { cn } from "@/lib/utils";

export default function Button({ className, ...props }) {
  return <button className={cn("px-4 py-2 bg-blue-600", className)} />;
}
```

---

## 🔌 API Endpoints

### Auth

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/refresh`
- `POST /auth/logout`

### Products

- `GET /products`
- `GET /products/:id`
- `POST /products` (admin/seller)
- `PATCH /products/:id`
- `DELETE /products/:id`

### Cart

- `GET /cart`
- `POST /cart`
- `PATCH /cart/:productId`
- `DELETE /cart/:productId`

### Orders

- `POST /orders`
- `GET /orders`
- `GET /orders/:id`
- `PATCH /orders/:id`
- `DELETE /orders/:id`

### And more... (xem lib/endpoints.ts)

---

## 🧪 Testing Components

```typescript
// Import
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Test
describe("Button", () => {
  it("should render button", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("should call onClick", async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);

    await userEvent.click(screen.getByText("Click"));
    expect(onClick).toHaveBeenCalled();
  });
});
```

---

## 🐛 Debugging Tips

### Check Network Requests

1. Open DevTools → Network tab
2. Filter by XHR/Fetch
3. Check request/response

### Check State

1. Install Redux DevTools
2. Check Zustand devtools
3. Inspect localStorage

### Check Rendering

1. React DevTools extension
2. Highlight re-renders
3. Check component tree

---

## 📈 Performance Tips

1. **Code Splitting** - Use dynamic imports for heavy components
2. **Memoization** - React.memo(), useMemo(), useCallback()
3. **Images** - Use next/image for optimization
4. **Bundle** - Check bundle size with `npm run build`
5. **Lazy Loading** - Intersection Observer for infinite scroll

---

## 🚀 Deployment Checklist

- [ ] Environment variables set
- [ ] API URL correct
- [ ] No console errors
- [ ] Mobile responsive
- [ ] SEO meta tags
- [ ] Performance optimized
- [ ] Security headers
- [ ] Error handling complete

---

## 📞 Quick Links

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind Docs](https://tailwindcss.com)
- [TypeScript Docs](https://www.typescriptlang.org/docs)

---

Chúc bạn viết code vui vẻ! 🚀
