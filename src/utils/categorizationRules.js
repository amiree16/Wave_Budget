const categorizationRules = [
    {
        keywords: ["omv", "petrom", "rompetrol", "mol", "lukoil"],
        tip: "Expense",
        categorie: "Business",
        subcategorie: "Fuel",
    },
    {
        keywords: ["apple pay"],
        tip: "Expense",
        categorie: "Personal",
        subcategorie: "Personal Expense",
    },
    {
        keywords: ["microsoft", "google", "aws", "atlassian"],
        tip: "Expense",
        categorie: "Business",
        subcategorie: "Software",
    },
    {
        keywords: ["salariat"],
        tip: "Expense",
        categorie: "Business",
        subcategorie: "Wages",
    },

    {
        keywords: ["client", "payment", "invoice"],
        tip: "Income",
        categorie: "Business",
        subcategorie: "Client Income",
    },
    {
        keywords: ["Dividende", "dividend", "profit share"],
        tip: "Income",
        categorie: "Business",
        subcategorie: "Dividends",
    },
];

export function categorizeTransaction(tip, text) {
    const lowerText = text.toLowerCase();

    for (const rule of categorizationRules) {
        if (rule.tip !== tip) continue;

        for (const keyword of rule.keywords) {
            if (lowerText.includes(keyword)) {
                return {
                    categorie: rule.categorie,
                    subcategorie: rule.subcategorie,
                };
            }
        }
    }

    return {
        categorie: tip === "Expense" ? "Business" : "Uncategorized",
        subcategorie: tip === "Expense" ? "Other" : "Uncategorized",
    };
}
