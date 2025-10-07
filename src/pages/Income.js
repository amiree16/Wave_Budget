import { useEffect, useState } from "react";
import axios from "axios";
import BudgetPieChart from "../components/BudgetPieChart";
import CustomLineChart from "../components/CustomLineChart";
import YearFilter from "../components/YearFilter";
import { extractYears, filterByYear } from "../utils/yearUtils";

export default function Income() {
    const [transactions, setTransactions] = useState([]);
    const [selectedYear, setSelectedYear] = useState(2025);
    const [availableYears, setAvailableYears] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/transactions")
            .then((res) => {
                setTransactions(res.data || []);
                setAvailableYears(extractYears(res.data));
            })
            .catch((err) => console.error("Error fetching transactions:", err));
    }, []);

    const incomes = filterByYear(
        transactions.filter((tx) => tx.tip === "Income"),
        selectedYear
    );

    //Calculam suma totala
    const total = incomes.reduce((acc, tx) => acc + tx.suma, 0);
    const average = incomes.length ? total / incomes.length : 0;

    //Returnam suma pt fiecare subcategorie
    const groupedBySubcategory = incomes.reduce((acc, tx) => {
        const key = tx.subcategorie || "Other";
        acc[key] = (acc[key] || 0) + Math.abs(tx.suma);
        return acc;
    }, {});

    //Transformam arrayul returnat de groupBySubcategory in [{ name: "Client", value: 800 }],unde fiecare element din lista este un obiect
    const pieData = Object.entries(groupedBySubcategory).map(([name, value]) => ({
        name,
        value,
    }));

    //Fiecarei luna ii este atribuita suma incasarilor. Returnam un map
    const groupedByMonth = incomes.reduce((acc, tx) => {
        const [day, month, year] = tx.data_inregistrarii?.split(/[./-]/) || [];
        if (!year || !month) return acc;

        const key = `${year}-${month}`;
        acc[key] = (acc[key] || 0) + Math.abs(tx.suma);
        return acc;
    }, {});

    //Returnam o lista de obiecte cu acest format { month: "2025-01", value: 800 },
    const lineChartData = Object.entries(groupedByMonth)
        .map(([month, value]) => ({ month, value }))
        .sort((a, b) => new Date(`${a.month}-01`) - new Date(`${b.month}-01`));

    const mostProfitableSubcategory = pieData.reduce(
        (prev, curr) => (curr.value > prev.value ? curr : prev),
        { name: "None", value: 0 }
    );

    return (
        <div className="income-page">
            <h1 className="page-title">Încasări ({selectedYear})</h1>

            <YearFilter
                selectedYear={selectedYear}
                availableYears={availableYears}
                onChange={setSelectedYear}
            />

            <div className="stats-grid">
                <div className="stat-box">
                    <h4>Total</h4>
                    <p>
                        {total.toLocaleString("ro-RO", {
                            style: "currency",
                            currency: "RON",
                        })}
                    </p>
                </div>
                <div className="stat-box">
                    <h4>Medie</h4>
                    <p>{average.toFixed(2)} RON / tranzacție</p>
                </div>
                <div className="stat-box">
                    <h4>Subcategoria Principală</h4>
                    <p>
                        {mostProfitableSubcategory.name} -{" "}
                        {mostProfitableSubcategory.value.toFixed(0)} RON
                    </p>
                </div>
            </div>

            <div className="card">
                <h3>Distribuție pe Subcategorii</h3>
                <BudgetPieChart data={pieData} />
            </div>

            <div className="card" style={{ marginTop: "24px" }}>
                <h3>Evoluție Lunară a Încasărilor</h3>
                <CustomLineChart data={lineChartData} />
            </div>
        </div>
    );
}
