import { useEffect, useState } from "react";
import axios from "axios";
import SummaryCard from "../components/SummaryCard";
import MonthlyBarChart from "../components/MonthlyBarChart";
import YearFilter from "../components/YearFilter";
import { extractYears, filterByYear } from "../utils/yearUtils";
//Extragem numerele din data
function parseCustomDate(dateStr) {
    if (!dateStr) return null;

    const [day, month, year] = dateStr.split(/[./-]/);
    return new Date(`${year}-${month}-${day}`);
}

function groupByMonth(transactions) {
    const map = {};

    transactions.forEach((tx) => {
        const date = parseCustomDate(tx.data_inregistrarii);
        if (!date || isNaN(date)) return;

        /*
        Construim o cheie pt fiecare luna de forma yyyy-mm, si ne asiguram ca avem mereu 2 cifre ex "08"
        Adaugam 1 pt ca numaratoarea lunilor incepe de la pozitia 0
         */
        const key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;

        if (!map[key]) {
            map[key] = { income: 0, expenses: 0 };
        }

        if (tx.tip === "Income") {
            map[key].income += tx.suma;
        } else if (tx.tip === "Expense") {
            map[key].expenses += Math.abs(tx.suma);
        }
    });

    const sortedKeys = Object.keys(map).sort();
    return sortedKeys.map((key) => ({
        month: key,
        ...map[key],
    }));
}


export default function Home() {
    const [transactions, setTransactions] = useState([]);
    const [selectedYear, setSelectedYear] = useState(2025);
    const [availableYears, setAvailableYears] = useState([]);


    useEffect(() => {
        axios
            .get("http://localhost:3001/transactions")
            .then((res) => {
                setTransactions(res.data);
                setAvailableYears(extractYears(res.data));
            })
            .catch((err) => console.error("Error fetching data", err));
    }, []);


    const validTransactions = Array.isArray(transactions) ? transactions : [];

    const filteredTransactions = filterByYear(validTransactions,selectedYear)

    const totalIncome = filteredTransactions
        .filter(t => t.tip === "Income")
        .reduce((sum, t) => sum + t.suma, 0);

    const totalExpenses = filteredTransactions
        .filter(t => t.tip === "Expense")
        .reduce((sum, t) => sum + Math.abs(t.suma), 0);


    const netProfit = totalIncome - totalExpenses;

    const monthlyData = groupByMonth(filteredTransactions);

    return (
        <div>
            <h1 className="page-title">Dashboard</h1>

            <YearFilter
                selectedYear={selectedYear}
                availableYears={availableYears}
                onChange={setSelectedYear}
            />

            <div className="summary-container">
                <SummaryCard title="Venituri" value={totalIncome} color="#10b981" />
                <SummaryCard title="Cheltuieli" value={totalExpenses} color="#f97316" />
                <SummaryCard title="Profit Net" value={netProfit} color="#3b82f6" />
            </div>

            <div className="card" style={{ marginTop: "24px" }}>
                <h3>Venituri vs Cheltuieli ({selectedYear})</h3>
                <MonthlyBarChart data={monthlyData} />
            </div>
        </div>
    );
}