import { useEffect, useState } from "react";
import axios from "axios";
import BudgetPieChart from "../components/BudgetPieChart";

import CustomLineChart from "../components/CustomLineChart";


export default function Expenses() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/transactions")
            .then(res => setTransactions(res.data || []))
            .catch(err => console.error("Error fetching transactions:", err));
    }, []);

    const expenses = transactions.filter(tx => tx.tip === "Expense");

    const total = expenses.reduce((acc, tx) => acc + Math.abs(tx.suma), 0);
    const average = expenses.length ? total / expenses.length : 0;

    const groupedBySubcategory = expenses.reduce((acc, tx) => {
        const key = tx.subcategorie || "Other";
        acc[key] = (acc[key] || 0) + Math.abs(tx.suma);
        return acc;
    }, {});

    const pieData = Object.entries(groupedBySubcategory).map(([name, value]) => ({
        name,
        value
    }));

    const groupedByMonth = expenses.reduce((acc, tx) => {
        const [day, month, year] = tx.data_inregistrarii?.split(/[./-]/) || [];
        if (!year || !month) return acc;

        const key = `${year}-${month}`;
        acc[key] = (acc[key] || 0) + Math.abs(tx.suma);
        return acc;
    }, {});

    const lineChartData = Object.entries(groupedByMonth)
        .map(([month, value]) => ({ month, value }))
        .sort((a, b) => new Date(`${a.month}-01`) - new Date(`${b.month}-01`));

    const mostExpensiveSubcategory = pieData.reduce((prev, curr) =>
            curr.value > prev.value ? curr : prev,
        { name: "None", value: 0 }
    );

    return (
        <div className="expenses-page">
            <h1 className="page-title">Cheltuieli</h1>

            <div className="stats-grid">
                <div className="stat-box">
                    <h4>Total</h4>
                    <p>{total.toLocaleString("ro-RO", { style: "currency", currency: "RON" })}</p>
                </div>
                <div className="stat-box">
                    <h4>Medie</h4>
                    <p>{average.toFixed(2)} RON / tranzacție</p>
                </div>
                <div className="stat-box">
                    <h4>Subcategoria Principală</h4>
                    <p>{mostExpensiveSubcategory.name} - {mostExpensiveSubcategory.value.toFixed(0)} RON</p>
                </div>
            </div>

            <div className="card">
                <h3>Distribuție pe Subcategorii</h3>
                <BudgetPieChart data={pieData} />
            </div>

            <div className="card" style={{ marginTop: "24px" }}>
                <h3>Evoluție Lunară a Cheltuielilor</h3>
                <CustomLineChart data={lineChartData} />

            </div>
        </div>
    );
}
