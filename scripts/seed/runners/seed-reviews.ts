
import { Review, Product, User } from '../utils/models';

export async function seedReviews() {
    console.log('⭐ Seeding Reviews...');

    const alice = await User.findOne({ email: 'customer1@gmail.com' });
    const products = await Product.find({}).limit(1);

    if (!alice || products.length === 0) {
        console.warn('⚠️ Skipping Reviews seed: Missing User or Product.');
        return;
    }

    const reviewData = {
        productId: products[0]._id,
        userId: alice._id,
        rating: 5,
        comment: 'Amazing product! Delivered fast.',
        images: [],
        isActive: true,
    };

    await Review.findOneAndUpdate(
        { productId: products[0]._id, userId: alice._id },
        reviewData,
        { upsert: true, new: true }
    );

    console.log('✅ Seeded 1 Review.');
}
