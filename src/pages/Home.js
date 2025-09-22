import BudgetPieChart from "../components/BudgetPieChart";

const expenseData = [
    { name: "Salaries", value: 5000 },
    { name: "Marketing", value: 2000 },
    { name: "Office Supplies", value: 1000 },
];

const incomeData = [
    { name: "Product Sales", value: 7000 },
    { name: "Consulting", value: 3000 },
];

export default function Home() {
    return (
        <div>
            <h1 className="page-title">Dashboard</h1>
            <div className="cards">
                <div className="card">
                    <h3>Expenses</h3>
                    <BudgetPieChart data={expenseData} />
                </div>
                <div className="card">
                    <h3>Income</h3>
                    <BudgetPieChart data={incomeData} />
                </div>
            </div>
        </div>
    );
}
