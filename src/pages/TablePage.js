import { useEffect, useState } from "react";
import axios from "axios";
import TransactionTable from "../components/TransactionTable";
import { decryptData } from "../utils/Encryption";
import YearFilter from "../components/YearFilter";
import { extractYears, filterByYear } from "../utils/yearUtils";
export default function TablePage() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedYear, setSelectedYear] = useState(2025);
    const [availableYears, setAvailableYears] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axios.get("http://localhost:3001/transactions");
                const decrypted = res.data.map((t) => ({
                    //Copiaza proprietatile din obiectul t intr un nou obiect
                    ...t,
                    cont_propriu: t.cont_propriu ? decryptData(t.cont_propriu) : "",
                    iban_partener: t.iban_partener ? decryptData(t.iban_partener) : "",
                }));

                setTransactions(decrypted);
                setAvailableYears(extractYears(res.data));
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

    const filteredTransactions = filterByYear(transactions, selectedYear);

    return (
        <div>
            <h1 className="page-title">Transactions ({selectedYear})</h1>


            <YearFilter
                selectedYear={selectedYear}
                availableYears={availableYears}
                onChange={setSelectedYear}
            />

            <TransactionTable data={filteredTransactions} />
        </div>
    );
}

