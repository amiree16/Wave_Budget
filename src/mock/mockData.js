import { faker } from '@faker-js/faker';

export function generateMockData(count = 20) {
    return Array.from({ length: count }, () => ({
        nume_cont_propriu: faker.person.fullName(),
        cont_propriu: faker.finance.iban(),
        data_inregistrarii: faker.date.recent().toISOString().split('T')[0],
        nume_partener: faker.person.fullName(),
        iban_partener: faker.finance.iban(),
        suma: parseFloat(faker.finance.amount(100, 5000, 2)),
        moneda: faker.finance.currency(),
        description: faker.commerce.productName(),
        tip: faker.helpers.arrayElement(["Income", "Expense"]),
    }));
}
