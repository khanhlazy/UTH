import apiClient from "@/lib/apiClient";
import { endpoints } from "@/lib/endpoints";
import { User, Address } from "@/lib/types";

export const userService = {
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<User>(endpoints.users.profile);
    return response.data;
  },

  getUsers: async (role?: string): Promise<User[]> => {
    const params = role ? `?role=${role}` : "";
    const response = await apiClient.get<User[]>(
      `${endpoints.users.list}${params}`
    );
    return response.data;
  },

  getUser: async (id: string): Promise<User> => {
    const response = await apiClient.get<User>(endpoints.users.detail(id));
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await apiClient.put<User>(endpoints.users.profile, data);
    return response.data;
  },

  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await apiClient.put<User>(
      endpoints.users.update(id),
      data
    );
    return response.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(endpoints.users.delete(id));
  },

  getAddresses: async (): Promise<Address[]> => {
    try {
      const response = await apiClient.get<Address[]>(
        endpoints.users.addresses
      );
      return response.data.map((addr: any) => ({
        ...addr,
        id: addr._id || addr.id,
      }));
    } catch {
      // Fallback: get addresses from profile
      const user = await userService.getProfile();
      return (user.addresses || []).map((addr: any) => ({
        ...addr,
        id: addr._id || addr.id,
      }));
    }
  },

  addAddress: async (
    address: Omit<Address, "id" | "userId" | "createdAt" | "updatedAt">
  ): Promise<Address> => {
    // Send address data directly
    const response = await apiClient.post<any>(
      endpoints.users.addresses,
      address
    );
    // Backend returns full user object, extract the last address added
    const user = response.data;
    if (user && user.addresses && user.addresses.length > 0) {
      const addedAddress = user.addresses[user.addresses.length - 1];
      return {
        ...addedAddress,
        id: (addedAddress as any)._id || addedAddress.id,
      } as Address;
    }
    return response.data;
  },

  updateAddress: async (
    addressId: string,
    address: Partial<Address>
  ): Promise<Address> => {
    // Send address data directly
    const response = await apiClient.put<any>(
      endpoints.users.address(addressId),
      address
    );
    // Backend returns full user object, find the updated address
    const user = response.data;
    if (user && user.addresses) {
      const updated = user.addresses.find(
        (addr: any) =>
          addr._id?.toString() === addressId || addr.id === addressId
      );
      if (updated) {
        return {
          ...updated,
          id: (updated as any)._id || updated.id,
        } as Address;
      }
    }
    return response.data;
  },

  deleteAddress: async (addressId: string): Promise<void> => {
    await apiClient.delete(endpoints.users.address(addressId));
  },

  setDefaultAddress: async (addressId: string): Promise<Address> => {
    const response = await apiClient.put<any>(
      endpoints.users.setDefaultAddress(addressId),
      {}
    );
    // Backend returns full user object, find the updated address
    const user = response.data;
    if (user && user.addresses) {
      const updated = user.addresses.find(
        (addr: any) =>
          addr._id?.toString() === addressId || addr.id === addressId
      );
      if (updated) {
        return {
          ...updated,
          id: (updated as any)._id || updated.id,
        } as Address;
      }
    }
    return response.data;
  },
};
