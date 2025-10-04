import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

export default function MonthlyBarChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${value.toLocaleString("ro-RO")} RON`} />
                <Legend />
                <Bar dataKey="income" fill="#00C49F" name="Venituri" />
                <Bar dataKey="expenses" fill="#FF8042" name="Cheltuieli" />
            </BarChart>
        </ResponsiveContainer>
    );
}
