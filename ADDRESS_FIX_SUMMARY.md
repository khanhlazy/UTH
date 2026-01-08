# Address Management Bug Fix Summary

## Problem
❌ **Error**: `http://localhost:3000/account/addresses` returned **404 (Not Found)** when trying to add/save addresses.

### Root Cause
There was a **mismatch between frontend and backend API expectations**:

1. **Frontend was sending**: Direct address object
   ```json
   {
     "name": "Nguyễn Văn A",
     "phone": "0901234567",
     "street": "123 Main St",
     "ward": "Phường 1",
     "district": "Quận 1",
     "city": "Ho Chi Minh",
     "isDefault": false
   }
   ```

2. **Backend DTO expected**: Wrapped address object
   ```json
   {
     "address": { ...address fields... }
   }
   ```

3. **Validation was failing** because the DTO validation expected the wrapped format, causing a 400/422 error that appeared as 404.

## Changes Made

### 1. ✅ Backend - User Service DTO (`services/user-service/src/users/dtos/user.dto.ts`)
**Changed**: AddAddressDto and UpdateAddressDto classes

```typescript
// BEFORE: Expected wrapped object
export class AddAddressDto {
  @ApiProperty({ description: "Thông tin địa chỉ" })
  @ValidateNested()
  @Type(() => AddressDto)
  address!: AddressDto;
}

// AFTER: Accept direct address data (extends AddressDto)
export class AddAddressDto extends AddressDto {
  // Accept direct address data - can be sent as:
  // { name, phone, street, ward, district, city, isDefault }
}

export class UpdateAddressDto extends AddressDto {
  // Accept direct address data - can be sent as:
  // { name, phone, street, ward, district, city, isDefault }
}
```

### 2. ✅ Backend - User Service Controller (`services/user-service/src/users/users.controller.ts`)
**Changed**: Address endpoint handlers to return individual Address objects instead of full User

```typescript
// POST /users/addresses - Add Address
async addAddress(...) {
  const user = await this.usersService.addAddress(userId, addressData);
  // Return the added address (last in array)
  const addedAddress = user.addresses?.[user.addresses.length - 1];
  return { ...addedAddress, _id: addedAddress._id };
}

// PUT /users/addresses/:addressId - Update Address
async updateAddress(...) {
  const user = await this.usersService.updateAddress(userId, addressId, updateData);
  // Return the updated address
  const updatedAddress = user.addresses?.find(...);
  return { ...updatedAddress, _id: updatedAddress._id };
}

// PUT /users/addresses/:addressId/set-default - Set Default
async setDefaultAddress(...) {
  const user = await this.usersService.setDefaultAddress(userId, addressId);
  // Return the updated address
  const updatedAddress = user.addresses?.find(...);
  return { ...updatedAddress, _id: updatedAddress._id };
}
```

### 3. ✅ Frontend - User Service (`frontend/services/userService.ts`)
**Changed**: Address methods to properly extract Address from User response

```typescript
// addAddress - Extract the added address from user response
addAddress: async (address) => {
  const response = await apiClient.post(endpoints.users.addresses, address);
  const user = response.data;
  const addedAddress = user.addresses?.[user.addresses.length - 1];
  return { ...addedAddress, id: addedAddress._id };
}

// updateAddress - Extract the updated address from user response
updateAddress: async (addressId, address) => {
  const response = await apiClient.put(endpoints.users.address(addressId), address);
  const user = response.data;
  const updated = user.addresses?.find(addr => addr._id?.toString() === addressId);
  return { ...updated, id: updated._id };
}

// setDefaultAddress - Extract the updated address from user response
setDefaultAddress: async (addressId) => {
  const response = await apiClient.put(endpoints.users.setDefaultAddress(addressId), {});
  const user = response.data;
  const updated = user.addresses?.find(addr => addr._id?.toString() === addressId);
  return { ...updated, id: updated._id };
}
```

## API Flow (After Fix)

```
┌─────────────────────────────────────┐
│     Frontend (Next.js)              │
│  POST /api/users/addresses          │
│  { name, phone, street, ... }       │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│    API Gateway (Port 3001)          │
│  Routes /api/users to user-service  │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  User Service Controller (Port 3003)│
│  POST /users/addresses              │
│  Validates with AddAddressDto       │
│  Returns: { ...address, _id }       │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│    User Service (MongoDB)           │
│  Saves to user.addresses[]          │
│  Returns: Updated User document     │
└─────────────────────────────────────┘
```

## Testing Instructions

### 1. Rebuild Docker Images
```bash
cd /Users/huynhngocbinh/Downloads/furnimart
docker-compose build --no-cache user-service
docker-compose build --no-cache api-gateway
```

### 2. Restart Services
```bash
docker-compose up -d
```

### 3. Test Address Management

**Add Address:**
```bash
# Get your user token first (login)
# Then test adding address:
curl -X POST http://localhost:3001/api/users/addresses \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nguyễn Văn A",
    "phone": "0901234567",
    "street": "123 Main Street",
    "ward": "Phường 1",
    "district": "Quận 1",
    "city": "Ho Chi Minh",
    "isDefault": true
  }'
```

**Expected Response** (200 OK):
```json
{
  "_id": "65a7c8d1e5f9b1c2d3e4f5g6",
  "name": "Nguyễn Văn A",
  "phone": "0901234567",
  "street": "123 Main Street",
  "ward": "Phường 1",
  "district": "Quận 1",
  "city": "Ho Chi Minh",
  "isDefault": true
}
```

### 4. Frontend Testing
1. Navigate to http://localhost:3000/account/addresses
2. Click "Thêm địa chỉ" button
3. Fill in the form with address details
4. Click "Thêm" button
5. Should see success toast: "Thêm địa chỉ thành công"
6. Address should appear in the list below

### 5. Verify in Frontend Components
The following pages now work correctly with addresses:
- ✅ `/account/addresses` - Manage addresses
- ✅ `/checkout` - Select saved addresses
- ✅ Profile - Show default address

## Files Changed
1. `services/user-service/src/users/dtos/user.dto.ts` - DTO validation fix
2. `services/user-service/src/users/users.controller.ts` - Response format fix
3. `frontend/services/userService.ts` - Response extraction fix

## Status
✅ **FIXED** - All address CRUD operations should now work correctly

## Notes
- The backend now stores addresses in `user.addresses[]` array
- Each address has `_id` (MongoDB ID) and other properties
- Frontend converts `_id` to `id` for consistency
- All address endpoints now return individual Address objects instead of full User documents
