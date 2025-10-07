import React from "react";

export default function YearFilter({ selectedYear, availableYears, onChange }) {
    return (
        <div style={{ marginBottom: "16px" }}>
            <label style={{ marginRight: "10px" }}>Selectează anul:</label>
            <select
                value={selectedYear}
                onChange={(e) => onChange(Number(e.target.value))}
            >
                {availableYears.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
    );
}
