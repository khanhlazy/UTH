
import { Promotion } from '../utils/models';

export async function seedPromotions() {
    console.log('🏷️ Seeding Promotions...');

    const promotions = [
        {
            code: 'WELCOME2024',
            name: 'Welcome New User',
            type: 'voucher',
            discountType: 'percentage',
            value: 10,
            minOrderValue: 500000,
            usageLimit: 1000,
            isActive: true,
        },
        {
            code: 'SUMMER_SALE',
            name: 'Summer Sale',
            type: 'campaign',
            discountType: 'fixed',
            value: 50000,
            minOrderValue: 1000000,
            usageLimit: 500,
            isActive: true,
        }
    ];

    for (const promo of promotions) {
        await Promotion.findOneAndUpdate(
            { code: promo.code },
            promo,
            { upsert: true, new: true }
        );
    }

    console.log(`✅ Seeded ${promotions.length} Promotions.`);
}
