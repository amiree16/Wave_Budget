import { useEffect, useState } from "react";
import axios from "axios";
import TransactionTable from "../components/TransactionTable";

export default function TablePage() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axios.get("http://localhost:3001/transactions");
                setTransactions(res.data);
            } catch (err) {
                console.error("Error fetching transactions:", err);
                setError("Failed to load transactions.");
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1 className="page-title">Transactions</h1>
            <TransactionTable data={transactions} />
        </div>
    );
}
