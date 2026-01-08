
import { Branch } from '../utils/models';

export const branchesData = [
    {
        code: 'B001',
        name: 'FurniMart Central (District 1)',
        description: 'Flagship showroom in the heart of HCMC.',
        address: {
            street: '123 Nguyen Hue',
            ward: 'Ben Nghe',
            district: 'District 1',
            city: 'Ho Chi Minh City',
            coordinates: { lat: 10.7769, lng: 106.7009 },
        },
        phone: '02811112222',
        email: 'hcm_center@furnimart.com',
        status: 'active',
        isActive: true,
    },
    {
        code: 'B002',
        name: 'FurniMart Riverside (District 7)',
        description: 'Spacious showroom with full inventory.',
        address: {
            street: '456 Nguyen Thi Thap',
            ward: 'Tan Phong',
            district: 'District 7',
            city: 'Ho Chi Minh City',
            coordinates: { lat: 10.7324, lng: 106.7214 },
        },
        phone: '02833334444',
        email: 'hcm_d7@furnimart.com',
        status: 'active',
        isActive: true,
    },
];

export async function seedBranches() {
    console.log('🏢 Seeding Branches...');
    const results = [];
    for (const branch of branchesData) {
        const b = await Branch.findOneAndUpdate(
            { code: branch.code },
            branch,
            { upsert: true, new: true }
        );
        results.push(b);
    }
    console.log(`✅ Seeded ${results.length} branches.`);
    return results;
}
