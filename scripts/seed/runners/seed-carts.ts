
import { Cart, User, Product, Branch } from '../utils/models';

export async function seedCarts() {
    console.log('🛒 Seeding Carts...');

    const alice = await User.findOne({ email: 'customer1@gmail.com' });
    const products = await Product.find({}).limit(2);
    const branch = await Branch.findOne({ code: 'B001' });

    if (!alice || products.length === 0 || !branch) {
        console.warn('⚠️ Skipping Carts seed: Missing dependencies.');
        return;
    }

    const result = await Cart.findOneAndUpdate(
        { userId: alice._id },
        {
            userId: alice._id,
            items: [
                {
                    productId: products[0]._id,
                    branchId: branch._id,
                    quantity: 2,
                },
                {
                    productId: products[1]._id,
                    branchId: branch._id,
                    quantity: 1,
                }
            ]
        },
        { upsert: true, new: true }
    );

    console.log('✅ Seeded Cart for Alice.');
    return result;
}
