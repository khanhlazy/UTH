
import { Wallet, User } from '../utils/models';

export async function seedWallets() {
    console.log('💰 Seeding Wallets...');

    const users = await User.find({ role: 'customer' });
    const results = [];

    for (const user of users) {
        const walletData = {
            userId: user._id,
            balance: 5000000, // 5 million VND default balance
            currency: 'VND',
            transactions: [
                {
                    type: 'TOPUP',
                    amount: 5000000,
                    description: 'Welcome Bonus',
                    status: 'COMPLETED',
                    createdAt: new Date(),
                }
            ]
        };

        const wallet = await Wallet.findOneAndUpdate(
            { userId: user._id },
            walletData,
            { upsert: true, new: true }
        );
        results.push(wallet);
    }

    console.log(`✅ Seeded Wallets for ${results.length} customers.`);
}
