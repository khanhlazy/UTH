# Address API Contract - Fixed

## 📍 API Endpoints

### 1. Add Address
```
POST /api/users/addresses
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "name": "Nguyễn Văn A",
  "phone": "0901234567",
  "street": "123 Nguyen Hue Blvd",
  "ward": "Phường Ben Thanh",
  "district": "Quận 1",
  "city": "Ho Chi Minh City",
  "isDefault": true
}

Response (200 OK):
{
  "_id": "65a7c8d1e5f9b1c2d3e4f5g6",
  "name": "Nguyễn Văn A",
  "phone": "0901234567",
  "street": "123 Nguyen Hue Blvd",
  "ward": "Phường Ben Thanh",
  "district": "Quận 1",
  "city": "Ho Chi Minh City",
  "isDefault": true
}
```

### 2. Update Address
```
PUT /api/users/addresses/{addressId}
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "name": "Nguyễn Văn B",
  "phone": "0987654321",
  "street": "456 Main St",
  "ward": "Phường 2",
  "district": "Quận 2",
  "city": "Ho Chi Minh City",
  "isDefault": false
}

Response (200 OK):
{
  "_id": "65a7c8d1e5f9b1c2d3e4f5g6",
  "name": "Nguyễn Văn B",
  "phone": "0987654321",
  "street": "456 Main St",
  "ward": "Phường 2",
  "district": "Quận 2",
  "city": "Ho Chi Minh City",
  "isDefault": false
}
```

### 3. Delete Address
```
DELETE /api/users/addresses/{addressId}
Authorization: Bearer {token}

Response (200 OK):
{
  "message": "Địa chỉ đã được xóa"
}
```

### 4. Set Default Address
```
PUT /api/users/addresses/{addressId}/set-default
Authorization: Bearer {token}

Request Body: {} (empty)

Response (200 OK):
{
  "_id": "65a7c8d1e5f9b1c2d3e4f5g6",
  "name": "Nguyễn Văn A",
  "phone": "0901234567",
  "street": "123 Nguyen Hue Blvd",
  "ward": "Phường Ben Thanh",
  "district": "Quận 1",
  "city": "Ho Chi Minh City",
  "isDefault": true
}
```

### 5. Get User Profile (includes addresses)
```
GET /api/users/profile
Authorization: Bearer {token}

Response (200 OK):
{
  "_id": "user_id_123",
  "email": "user@example.com",
  "name": "Nguyễn Văn A",
  "phone": "0901234567",
  "role": "customer",
  "addresses": [
    {
      "_id": "addr_1",
      "name": "Nguyễn Văn A",
      "phone": "0901234567",
      "street": "123 Nguyen Hue Blvd",
      "ward": "Phường Ben Thanh",
      "district": "Quận 1",
      "city": "Ho Chi Minh City",
      "isDefault": true
    },
    {
      "_id": "addr_2",
      "name": "Công ty ABC",
      "phone": "0918888888",
      "street": "456 Main St",
      "ward": "Phường 2",
      "district": "Quận 7",
      "city": "Ho Chi Minh City",
      "isDefault": false
    }
  ]
}
```

## 🔄 Frontend Usage

### React Hook Form Integration
```tsx
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "@/lib/validation";

export function AddressForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
  });

  const addMutation = useMutation({
    mutationFn: (data) => userService.addAddress(data),
    onSuccess: (address) => {
      console.log("Address saved:", address);
      // address now has id (converted from _id)
    },
  });

  const onSubmit = (data) => {
    // Data structure:
    // {
    //   fullName: string
    //   phone: string
    //   address: string
    //   ward: string
    //   district: string
    //   city: string
    //   isDefault: boolean
    // }
    
    const payload = {
      name: data.fullName,
      phone: data.phone,
      street: data.address,
      ward: data.ward,
      district: data.district,
      city: data.city,
      isDefault: data.isDefault || false,
    };
    
    addMutation.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("fullName")} />
      <input {...register("phone")} />
      <input {...register("address")} />
      <input {...register("ward")} />
      <input {...register("district")} />
      <input {...register("city")} />
      <input type="checkbox" {...register("isDefault")} />
      <button type="submit">Add Address</button>
    </form>
  );
}
```

## 📊 Data Type Mapping

| Frontend (form) | Backend (API) | MongoDB | Notes |
|---|---|---|---|
| fullName | name | name | User's name |
| phone | phone | phone | Contact phone |
| address | street | street | Street address |
| ward | ward | ward | Ward/Commune |
| district | district | district | District |
| city | city | city | City/Province |
| isDefault | isDefault | isDefault | Default flag |
| N/A | _id | _id | MongoDB ObjectId |
| N/A (converted to `id`) | N/A | N/A | Frontend alias |

## ✅ Validation Rules

```typescript
export const addressSchema = z.object({
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  address: z.string().min(5, "Địa chỉ phải có ít nhất 5 ký tự"),
  ward: z.string().min(1, "Phường/Xã không được để trống"),
  district: z.string().min(1, "Quận/Huyện không được để trống"),
  city: z.string().min(1, "Thành phố không được để trống"),
  isDefault: z.boolean(),
});
```

## 🔐 Authentication

All address endpoints require:
- `Authorization: Bearer {jwt_token}` header
- Valid JWT token from login
- Token must contain `userId` claim

## 🧪 Test Scenarios

### Scenario 1: Add First Address
1. User has 0 addresses
2. Add first address with `isDefault: false`
3. Expected: Address is automatically set as default (first address always defaults)

### Scenario 2: Add Second Address
1. User has 1 address (marked as default)
2. Add second address with `isDefault: false`
3. Expected: First address remains default, new one is not default

### Scenario 3: Add as Default
1. User has 1 address (marked as default)
2. Add second address with `isDefault: true`
3. Expected: First address is unset as default, new one becomes default

### Scenario 4: Update Address
1. Get address ID from profile
2. Send PUT request with updated data
3. Expected: Address is updated, _id remains same

### Scenario 5: Delete Address
1. Get address ID from profile
2. Send DELETE request
3. Expected: Address is removed from user.addresses array

### Scenario 6: Set Default
1. User has multiple addresses
2. Select non-default address and set default
3. Expected: Previous default is unset, new one becomes default

## 🐛 Common Issues & Solutions

### Issue: 404 Not Found
**Cause**: Invalid address ID or endpoint path typo
**Solution**: Verify addressId format and endpoint path

### Issue: 401 Unauthorized
**Cause**: Missing or invalid JWT token
**Solution**: Re-login and get valid token

### Issue: 422 Unprocessable Entity
**Cause**: Validation failed (required fields missing)
**Solution**: Check request body matches AddressDto schema

### Issue: Address appears in GET but not POST
**Cause**: Cache not refreshed
**Solution**: Invalidate React Query cache after mutation

## 📌 Related Pages
- Frontend Page: `/app/(customer)/account/addresses/page.tsx`
- Backend Controller: `/services/user-service/src/users/users.controller.ts`
- Backend Service: `/services/user-service/src/users/users.service.ts`
- Frontend Service: `/frontend/services/userService.ts`
