import { Product, Branch, Warehouse } from "../utils/models";
import { generateRandomInt } from "../utils/helpers";

export async function seedInventory() {
  console.log("📦 Seeding Inventory (Warehouse)...");

  // --- ĐOẠN CODE MỚI: ÉP XÓA INDEX SAI ---
  try {
    // Xóa index productId_1 nếu nó tồn tại
    await Warehouse.collection.dropIndex("productId_1");
    console.log("🔥 Đã xóa thành công index gây lỗi: productId_1");
  } catch (error) {
    // Nếu index không tồn tại thì bỏ qua, không sao cả
  }
  // ----------------------------------------

  const products = await Product.find({});
  const branches = await Branch.find({});

  if (products.length === 0 || branches.length === 0) {
    throw new Error("Products and Branches must be seeded before Inventory");
  }

  const results = [];

  for (const branch of branches) {
    for (const product of products) {
      // Randomize stock per branch to look realistic
      // Branch 1 (Code B001 - Central) has more stock
      const isCentral = branch.code === "B001";
      const quantity = isCentral
        ? generateRandomInt(50, 200)
        : generateRandomInt(10, 50);

      const reserved = generateRandomInt(0, 5); // Some items might be reserved

      const inventoryData = {
        productId: product._id,
        branchId: branch._id,
        quantity,
        reserved,
        productName: product.name,
        safetyStock: 5,
        isActive: true,
      };

      const inv = await Warehouse.findOneAndUpdate(
        { productId: product._id, branchId: branch._id },
        inventoryData,
        { upsert: true, new: true }
      );
      results.push(inv);
    }
  }

  console.log(`✅ Seeded ${results.length} inventory records.`);
  return results;
}
