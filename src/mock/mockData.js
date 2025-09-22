import { faker } from '@faker-js/faker';

export function generateMockData(count = 20) {
    return Array.from({ length: count }, () => ({
        id: faker.string.uuid(),
        date: faker.date.recent().toISOString().split('T')[0],
        category: faker.commerce.department(),
        amount: parseFloat(faker.finance.amount(100, 5000, 2)),
        description: faker.commerce.productName(),
        type: faker.helpers.arrayElement(["Income", "Expense"]),
    }));
}
