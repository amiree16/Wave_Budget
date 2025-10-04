import "./SummaryCard.css";

export default function SummaryCard({ title, value, color }) {
    return (
        <div className="summary-card" style={{ "--accent-color": color }}>
            <div className="summary-title">{title}</div>
            <div className="summary-amount">
                {value.toLocaleString("ro-RO", { style: "currency", currency: "RON" })}
            </div>
        </div>
    );
}
