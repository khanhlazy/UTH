
import { Chat, User } from '../utils/models';

export async function seedChat() {
    console.log('💬 Seeding Chat...');

    const alice = await User.findOne({ email: 'customer1@gmail.com' });
    const admin = await User.findOne({ email: 'admin@furnimart.com' });

    if (!alice || !admin) {
        console.warn('⚠️ Skipping Chat seed: Missing Users.');
        return;
    }

    const chatSession = {
        customerId: alice._id,
        agentId: admin._id,
        status: 'OPEN',
        messages: [
            {
                senderId: alice._id,
                content: 'Hi, when will my order arrive?',
                isRead: true,
                createdAt: new Date(Date.now() - 3600000),
            },
            {
                senderId: admin._id,
                content: 'Hello Alice, let me check that for you.',
                isRead: false,
                createdAt: new Date(),
            }
        ]
    };

    // We look for an open chat for this customer
    const exists = await Chat.findOne({ customerId: alice._id, status: 'OPEN' });

    if (!exists) {
        await Chat.create(chatSession);
        console.log('✅ Created new Chat session.');
    } else {
        // Optionally update items but for chat it's better to just ensure one exists
        console.log('ℹ️ Chat session already exists.');
    }
}
