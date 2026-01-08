
import { Dispute, Order, User } from '../utils/models';

export async function seedDisputes() {
    console.log('⚖️ Seeding Disputes...');

    // Use the delivered order for dispute
    const order = await Order.findOne({ orderNumber: 'ORD-001-DELIVERED' });
    const alice = await User.findOne({ email: 'customer1@gmail.com' });

    if (!order || !alice) {
        console.warn('⚠️ Skipping Dispute seed: Missing Order or User.');
        return;
    }

    const disputeData = {
        orderId: order._id,
        customerId: alice._id,
        reason: 'Product received damaged',
        status: 'PENDING',
    };

    await Dispute.findOneAndUpdate(
        { orderId: order._id },
        disputeData,
        { upsert: true, new: true }
    );

    console.log('✅ Seeded Dispute.');
}
