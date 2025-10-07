export function extractYears(transactions) {
    return Array.from(
        new Set(
            transactions
                .map((t) => t.data_inregistrarii?.split(/[./-]/)[2])
                .filter(Boolean)
        )
    )
        .map(Number)
        .sort((a, b) => b - a);
}

export function filterByYear(transactions, year) {
    if (!year) return transactions;
    return transactions.filter((t) => {
        const parts = t.data_inregistrarii?.split(/[./-]/);
        return Number(parts?.[2]) === year;
    });
}
