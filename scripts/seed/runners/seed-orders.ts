
import { Order, User, Product, Branch } from '../utils/models';

export async function seedOrders() {
    console.log('📦 Seeding Orders...');

    const alice = await User.findOne({ email: 'customer1@gmail.com' });
    const bob = await User.findOne({ email: 'customer2@gmail.com' });
    const products = await Product.find({});
    const branch1 = await Branch.findOne({ code: 'B001' });
    const branch2 = await Branch.findOne({ code: 'B002' });

    if (!alice || !bob || products.length < 3 || !branch1 || !branch2) {
        console.warn('⚠️ Skipping Orders seed: Missing dependencies.');
        return;
    }

    const ordersData = [
        // Order 1: Delivered (Alice)
        {
            orderNumber: 'ORD-001-DELIVERED',
            customerId: alice._id,
            branchId: branch1._id,
            items: [
                {
                    productId: products[0]._id,
                    productName: products[0].name,
                    quantity: 1,
                    price: products[0].price,
                },
                {
                    productId: products[1]._id,
                    productName: products[1].name,
                    quantity: 2,
                    price: products[1].price,
                }
            ],
            totalAmount: products[0].price * 1 + products[1].price * 2,
            status: 'DELIVERED',
            shippingAddress: alice.addresses[0],
            paymentMethod: 'VNPAY',
            isPaid: true,
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        },
        // Order 2: Pending (Bob)
        {
            orderNumber: 'ORD-002-PENDING',
            customerId: bob._id,
            branchId: branch2._id,
            items: [
                {
                    productId: products[2]._id,
                    productName: products[2].name,
                    quantity: 1,
                    price: products[2].price,
                }
            ],
            totalAmount: products[2].price,
            status: 'PENDING',
            shippingAddress: bob.addresses[0],
            paymentMethod: 'COD',
            isPaid: false,
            createdAt: new Date(), // Now
        }
    ];

    const results = [];
    for (const o of ordersData) {
        const order = await Order.findOneAndUpdate(
            { orderNumber: o.orderNumber },
            o,
            { upsert: true, new: true }
        );
        results.push(order);
    }
    console.log(`✅ Seeded ${results.length} orders.`);
    return results;
}
