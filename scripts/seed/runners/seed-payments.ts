
import { Payment, Order, User } from '../utils/models';

export async function seedPayments() {
    console.log('💳 Seeding Payments...');

    const orderDelivered = await Order.findOne({ orderNumber: 'ORD-001-DELIVERED' });
    const alice = await User.findOne({ email: 'customer1@gmail.com' });

    if (!orderDelivered || !alice) {
        console.warn('⚠️ Skipping Payments seed: Missing Order or User.');
        return;
    }

    // Payment for the delivered order
    const paymentData = {
        orderId: orderDelivered._id,
        userId: alice._id,
        amount: orderDelivered.totalAmount,
        provider: 'VNPAY',
        status: 'SUCCESS',
        transactionId: 'VNPAY_123456789',
    };

    await Payment.findOneAndUpdate(
        { transactionId: paymentData.transactionId },
        paymentData,
        { upsert: true, new: true }
    );

    console.log('✅ Seeded Payments.');
}
