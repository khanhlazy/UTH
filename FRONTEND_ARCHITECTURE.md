# 📱 Kiến trúc Frontend FurniMart - Hướng dẫn Chi tiết

## 🎯 Tổng quan Dự án

FurniMart là một **nền tảng thương mại điện tử nội thất** với kiến trúc **microservices**. Frontend được xây dựng bằng **Next.js 16** với **TypeScript**, **Tailwind CSS**, và **Zustand** để quản lý trạng thái.

---

## 📁 Cấu trúc Thư mục

```
frontend/
├── app/                          # App Router (Next.js 13+)
│   ├── (customer)/               # Layout cho khách hàng
│   │   ├── page.tsx              # Trang chủ
│   │   ├── products/             # Duyệt sản phẩm
│   │   ├── categories/           # Duyệt theo danh mục
│   │   ├── cart/                 # Giỏ hàng
│   │   ├── checkout/             # Thanh toán
│   │   ├── orders/               # Lịch sử đơn hàng
│   │   ├── shipping/             # Theo dõi vận chuyển
│   │   ├── chat/                 # Tư vấn qua chat
│   │   ├── wallet/               # Ví điện tử
│   │   ├── promotions/           # Khuyến mại
│   │   ├── account/              # Quản lý tài khoản
│   │   ├── branches/             # Chi nhánh
│   │   └── layout.tsx            # Layout chung
│   ├── (dashboard)/              # Layout cho dashboard
│   │   ├── products/             # Quản lý sản phẩm (seller/admin)
│   │   ├── orders/               # Quản lý đơn hàng
│   │   ├── analytics/            # Thống kê
│   │   ├── reviews/              # Quản lý đánh giá
│   │   ├── disputes/             # Quản lý tranh chấp
│   │   ├── settings/             # Cài đặt
│   │   └── layout.tsx            # Layout dashboard
│   ├── auth/                     # Trang xác thực
│   ├── api/                      # API routes nếu cần
│   ├── layout.tsx                # Layout gốc
│   ├── providers.tsx             # Providers (React Query, Zustand, etc)
│   └── globals.css               # CSS global
├── components/                   # Reusable Components
│   ├── ui/                       # UI primitives (Button, Card, Modal, etc)
│   ├── layout/                   # Layout components (Header, Sidebar, etc)
│   ├── product/                  # Product-related components
│   ├── cart/                     # Cart-related components
│   ├── checkout/                 # Checkout components
│   ├── order/                    # Order-related components
│   ├── shipping/                 # Shipping components
│   ├── payment/                  # Payment components
│   ├── chat/                     # Chat components
│   ├── wallet/                   # Wallet components
│   ├── dispute/                  # Dispute components
│   ├── review/                   # Review components
│   ├── dashboard/                # Dashboard components
│   └── common/                   # Common components
├── lib/                          # Utilities & Helpers
│   ├── types.ts                  # TypeScript types & interfaces
│   ├── endpoints.ts              # API endpoints
│   ├── apiClient.ts              # Axios client config
│   ├── format.ts                 # Formatting utilities
│   ├── validation.ts             # Validation schemas
│   ├── utils.ts                  # General utilities
│   ├── logger.ts                 # Logger utility
│   ├── notifications.ts          # Notification helper
│   ├── config/
│   │   ├── routes.ts             # Route constants
│   │   └── config.ts             # App config
│   ├── auth/
│   │   └── auth.ts               # Auth utilities
│   └── design-system/            # Design system
│       └── theme.ts              # Theme config
├── services/                     # API Services
│   ├── authService.ts            # Xác thực
│   ├── productService.ts         # Sản phẩm
│   ├── cartService.ts            # Giỏ hàng
│   ├── orderService.ts           # Đơn hàng
│   ├── paymentService.ts         # Thanh toán
│   ├── shippingService.ts        # Vận chuyển
│   ├── chatService.ts            # Chat
│   ├── walletService.ts          # Ví
│   ├── disputeService.ts         # Tranh chấp
│   ├── reviewService.ts          # Đánh giá
│   ├── promotionService.ts       # Khuyến mại
│   ├── categoryService.ts        # Danh mục
│   ├── branchService.ts          # Chi nhánh
│   ├── warehouseService.ts       # Kho hàng
│   ├── userService.ts            # Người dùng
│   ├── dashboardService.ts       # Dashboard
│   ├── uploadService.ts          # Upload file
│   ├── settingsService.ts        # Cài đặt
│   └── index.ts                  # Export all services
├── store/                        # Zustand Stores
│   ├── authStore.ts              # Auth state
│   ├── cartStore.ts              # Cart state
│   └── ui.store.ts               # UI state
├── hooks/                        # Custom React Hooks
│   ├── useAuthInit.ts            # Init auth on load
│   ├── useDebounce.ts            # Debounce hook
│   ├── useToast.ts               # Toast notifications
│   └── [other hooks]
├── public/                       # Static files
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind config
├── tsconfig.json                 # TypeScript config
└── next.config.ts                # Next.js config
```

---

## 🏗️ Kiến trúc Lớp

### 1. **Presentation Layer (Components & Pages)**

- Xử lý UI và hiển thị dữ liệu
- Gọi services để lấy dữ liệu
- Sử dụng Zustand để quản lý state
- Có thể sử dụng React Query để cache dữ liệu

### 2. **Service Layer**

- Giao tiếp với Backend API
- Xử lý logic dữ liệu
- Định dạng request/response
- Xử lý errors

### 3. **State Management Layer (Zustand Stores)**

- Lưu trữ auth data (user, tokens)
- Lưu trữ cart data
- Lưu trữ UI state (loading, errors, notifications)

### 4. **Utility Layer**

- Format dữ liệu (tiền tệ, ngày tháng)
- Validation logic
- Logger
- Notification helpers

---

## 🔐 Xác thực (Authentication)

### Flow:

```
User Login
    ↓
authService.login() → Backend
    ↓
Get Access Token + Refresh Token + User Info
    ↓
Store in Zustand (authStore)
    ↓
Save Tokens to Cookies (for API requests)
    ↓
Redirect to Home
```

### Key Files:

- `services/authService.ts` - Gọi API auth
- `store/authStore.ts` - Lưu auth state
- `hooks/useAuthInit.ts` - Khôi phục auth khi refresh page
- `lib/apiClient.ts` - Tự động thêm token vào requests

---

## 🛒 Giỏ Hàng (Cart)

### State:

```typescript
{
  items: CartItem[]          // Sản phẩm trong giỏ
  totalAmount: number        // Tổng tiền
  addItem: (item) => void    // Thêm sản phẩm
  removeItem: (id) => void   // Xóa sản phẩm
  updateQuantity: (id, qty) => void  // Cập nhật số lượng
  setCart: (items) => void   // Set giỏ từ backend
}
```

### Flow:

1. Người dùng click "Thêm vào giỏ" trên sản phẩm
2. Thêm vào `cartStore` (Zustand)
3. Đồng thời gửi request đến `cartService.addItem()`
4. Khi vào trang Cart, hiển thị từ `cartStore`
5. Khi checkout, gửi items đến `orderService.create()`

---

## 📦 Đơn Hàng (Orders)

### Order Status Flow:

```
PENDING_CONFIRMATION (Chờ xác nhận)
    ↓
CONFIRMED (Đã xác nhận)
    ↓
PACKING (Đang đóng gói)
    ↓
READY_TO_SHIP (Sẵn sàng giao)
    ↓
SHIPPING (Đang giao)
    ↓
DELIVERED (Đã giao)
    ↓
COMPLETED (Hoàn thành)
```

### Key Files:

- `services/orderService.ts` - Tạo, lấy, cập nhật đơn hàng
- `app/(customer)/orders/` - Xem danh sách và chi tiết đơn
- `components/order/` - Order components

---

## 💳 Thanh Toán (Payment)

### Payment Methods:

- **COD** (Cash on Delivery) - Thanh toán khi nhận hàng
- **Stripe** - Thẻ tín dụng/debit quốc tế
- **MoMo** - Ví điện tử MoMo
- **VnPay** - Cổng thanh toán VnPay
- **Wallet** - Ví điện tử FurniMart
- **ZaloPay** - Thanh toán qua Zalo

### Key Files:

- `services/paymentService.ts` - Xử lý payment
- `app/(customer)/checkout/` - Trang thanh toán
- `app/(customer)/payment/` - Xác nhận payment

---

## 🚚 Vận Chuyển (Shipping)

### Tracking Status:

```
ASSIGNED (Giao cho shipper)
    ↓
PICKED_UP (Đã lấy hàng)
    ↓
IN_TRANSIT (Đang vận chuyển)
    ↓
OUT_FOR_DELIVERY (Sắp giao)
    ↓
DELIVERED (Đã giao)
```

### Key Files:

- `services/shippingService.ts` - Quản lý vận chuyển
- `app/(customer)/shipping/` - Theo dõi vận chuyển
- `components/shipping/` - Shipping components

---

## 💬 Chat

### Features:

- Khách hàng có thể chat với seller để tư vấn sản phẩm
- Lịch sử chat được lưu trữ

### Key Files:

- `services/chatService.ts` - Chat API
- `app/(customer)/chat/` - Chat interface
- `components/chat/` - Chat components

---

## 💰 Ví Điện Tử (Wallet)

### Features:

- Nạp tiền vào ví
- Xem số dư
- Chi tiêu từ ví
- Lịch sử giao dịch

### Key Files:

- `services/walletService.ts` - Wallet API
- `app/(customer)/wallet/` - Wallet page

---

## ⚖️ Tranh Chấp (Dispute)

### Features:

- Tạo tranh chấp về đơn hàng
- Tải lên evidence (chứng chỉ)
- Theo dõi trạng thái giải quyết

### Key Files:

- `services/disputeService.ts` - Dispute API
- `app/(customer)/orders/[id]/` - Tạo dispute từ order detail

---

## ⭐ Đánh Giá & Review

### Features:

- Đánh giá sản phẩm (1-5 sao)
- Viết review
- Xem reviews của sản phẩm
- Tải ảnh cho review

### Key Files:

- `services/reviewService.ts` - Review API
- `app/(customer)/orders/[id]/review` - Tạo review
- `components/product/` - Hiển thị reviews

---

## 🎉 Khuyến Mại (Promotions)

### Features:

- Xem danh sách khuyến mại
- Áp dụng mã giảm giá vào đơn hàng
- Theo dõi mã mình sử dụng

### Key Files:

- `services/promotionService.ts` - Promotion API
- `app/(customer)/promotions/` - Danh sách khuyến mại
- `app/(customer)/checkout/` - Áp dụng mã giảm giá

---

## 📊 Dashboard

### Seller Dashboard:

- Quản lý sản phẩm (CRUD)
- Quản lý đơn hàng
- Xem reviews
- Quản lý tranh chấp
- Xem thống kê

### Admin Dashboard:

- Quản lý tất cả sản phẩm
- Quản lý tất cả đơn hàng
- Quản lý người dùng
- Quản lý chi nhánh
- Xem thống kê toàn hệ thống
- Quản lý tranh chấp

### Key Files:

- `app/(dashboard)/` - Dashboard pages
- `components/dashboard/` - Dashboard components
- `services/dashboardService.ts` - Dashboard API

---

## 🏢 Chi Nhánh (Branches)

### Features:

- Xem danh sách chi nhánh
- Xem chi tiết chi nhánh
- Seller có thể đăng ký chi nhánh
- Admin có thể phê duyệt chi nhánh

### Key Files:

- `services/branchService.ts` - Branch API
- `app/(customer)/branches/` - Danh sách chi nhánh

---

## 📂 Danh Mục (Categories)

### Features:

- Xem danh sách danh mục
- Lọc sản phẩm theo danh mục
- Danh mục lồng nhau (subcategories)

### Key Files:

- `services/categoryService.ts` - Category API
- `app/(customer)/categories/` - Danh mục page
- `app/(customer)/products/` - Lọc theo danh mục

---

## 📋 TypeScript Types

### Core Types:

```typescript
// Người dùng
interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  addresses: Address[];
  // ...
}

// Sản phẩm
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  categoryId: string;
  stock: number;
  // ...
}

// Giỏ hàng
interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  // ...
}

// Đơn hàng
interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  // ...
}

// Vận chuyển
interface ShippingTracking {
  id: string;
  orderId: string;
  status: ShippingStatus;
  currentLocation?: string;
  // ...
}
```

---

## 🔄 Data Flow

### 1. User Login Flow:

```
Login Form → authService.login()
→ Backend returns tokens + user
→ Store in authStore + cookies
→ Redirect to home
```

### 2. Product Browsing Flow:

```
Products Page → productService.getProducts()
→ Backend returns products (paginated)
→ Display in grid
→ User filters → productService.getProducts(filters)
```

### 3. Add to Cart Flow:

```
Product Detail → Click "Thêm vào giỏ"
→ cartService.addItem() (async)
→ Update cartStore (immediate)
→ Show toast notification
```

### 4. Checkout Flow:

```
Cart Page → Click "Thanh toán"
→ Redirect to /checkout
→ User fills shipping address
→ Select payment method
→ orderService.create(orderData)
→ If payment needed → paymentService.initiate()
→ Redirect to order confirmation
```

---

## 🛠️ Development Workflow

### 1. Setup:

```bash
npm install
npm run dev
```

### 2. Create New Feature:

```
1. Define types in lib/types.ts
2. Create API service in services/
3. Create components in components/
4. Create pages/routes
5. Test with backend API
```

### 3. Styling:

- Use Tailwind CSS classes
- Follow design system in `lib/design-system/`
- Use utility classes from `lib/utils.ts`

### 4. State Management:

- Use Zustand stores for persistent state
- Use React Query for server state
- Use component state for UI state

---

## 📱 Responsive Design

- Mobile first approach
- Tailwind breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- All components should be mobile responsive

---

## 🔒 Security

- **Tokens**: Stored in cookies with HttpOnly flag
- **CORS**: Configured on backend
- **Validation**: Input validation with Zod
- **Auth Guards**: Route protection for authenticated pages

---

## 🧪 Testing

- Unit tests for utilities
- Component tests for complex components
- E2E tests for critical flows

---

## 📚 Best Practices

1. **Separation of Concerns**: Components, services, utilities tách biệt
2. **Reusability**: Tạo components tái sử dụng
3. **Type Safety**: Sử dụng TypeScript cho tất cả
4. **Error Handling**: Xử lý errors gracefully
5. **Loading States**: Hiển thị loading indicators
6. **Accessibility**: WCAG compliance
7. **Performance**: Code splitting, lazy loading

---

## 📦 Dependencies

- **Next.js 16**: Framework
- **React 19**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Zustand**: State management
- **React Query**: Server state
- **Axios**: HTTP client
- **React Hook Form**: Form handling
- **Zod**: Schema validation
- **React Icons**: Icons
- **React Toastify**: Notifications
- **Recharts**: Charts/graphs
- **Three.js/React Three Fiber**: 3D visualization

---

## 🚀 Performance Tips

1. Use `next/image` for image optimization
2. Code splitting with dynamic imports
3. Lazy load heavy components
4. Cache API responses with React Query
5. Optimize bundle size

---

## 📞 API Integration

### Auth Header:

```
Authorization: Bearer {accessToken}
```

### Response Format:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": { ... }
}
```

### Error Format:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error message",
  "data": null
}
```

---

## 🎓 Hướng dẫn sử dụng các phần chính

### Thêm Sản phẩm Mới vào Giỏ:

```typescript
// Trong component product detail:
import { useCartStore } from "@/store/cartStore";
import { cartService } from "@/services/cartService";

const handleAddToCart = async (product: Product) => {
  const { addItem } = useCartStore();

  // Thêm vào local state ngay lập tức
  addItem({
    id: product.id,
    productId: product.id,
    product,
    quantity: 1,
    price: product.price,
  });

  // Gửi đến backend async
  try {
    await cartService.addItem(product.id, 1);
  } catch (error) {
    removeItem(product.id); // Rollback nếu error
  }
};
```

### Lấy Danh sách Sản phẩm với Filter:

```typescript
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/productService";

const { data, isLoading, error } = useQuery({
  queryKey: ["products", filters],
  queryFn: () => productService.getProducts(filters),
});
```

### Tạo Đơn Hàng:

```typescript
import { orderService } from "@/services/orderService";

const handleCheckout = async (orderData: CreateOrderDTO) => {
  try {
    const order = await orderService.create(orderData);
    // Redirect to order confirmation
    router.push(`/orders/${order.id}`);
  } catch (error) {
    // Handle error
  }
};
```

---

Đây là kiến trúc đầy đủ. Bây giờ hãy xem các file code cụ thể dưới đây!
