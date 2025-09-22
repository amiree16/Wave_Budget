import TransactionTable from "../components/TransactionTable";
import { generateMockData } from "../mock/mockData";

const mockData = generateMockData(25);

export default function TablePage() {
    return (
        <div>
            <h1 className="page-title">Transactions</h1>
            <TransactionTable data={mockData} />
        </div>
    );
}
