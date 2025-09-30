// src/components/CsvImportForm.js

import Papa from "papaparse";
import axios from "axios";
import { useState } from "react";
import { categorizeTransaction } from "../utils/categorizationRules";

export default function CsvImportForm() {
    const [csvFile, setCsvFile] = useState(null);
    const [message, setMessage] = useState("");

    //Event Handlerul care se ocupa de formularul de upload CSV
    const handleFileChange = (e) => {
        setCsvFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (!csvFile) return;

        //Folosim papa.parse ca sa transformam CSV_ul in obiecte JavaScript
        Papa.parse(csvFile, {
            header: true,
            skipEmptyLines: true,
            /*In interiorul result, obiectul are forma
             {
                    data:[]
                    errors:[]
                    meta:[]
             }*/
            complete: async (result) => {
                const records = result.data;

                try {
                    for (const record of records) {
                        // Inlocuim "," cu "." pentru ca parseFloat nu accepta virgula, doar punct
                        const rawAmount = (record["Suma"] || "").replace(",", ".").trim();
                        const suma = parseFloat(rawAmount);
                        const tip = isNaN(suma) ? "Unknown" : (suma >= 0 ? "Income" : "Expense");

                        const combinedText = `${record["Descrierea tranzactiei"] || ""} ${record["Nume partener"] || ""}`;
                        const { categorie, subcategorie } = categorizeTransaction(tip, combinedText);

                        // Trimitem tranzactiile catre json-server
                        await axios.post("http://localhost:3001/transactions", {
                            nume_cont_propriu: record["Nume cont propriu"] || "",
                            cont_propriu: record["Cont propriu"] || "",
                            data_inregistrarii: record["Data inregistrarii"] || "",
                            nume_partener: record["Nume partener"] || "",
                            iban_partener: record["IBAN partener"] || "",
                            cod_bic_partener: record["Cod BIC partener"] || "",
                            cont_partener: record["Cont partener"] || "",
                            cod_banca_partener: record["Cod banca parte"] || "",
                            suma: isNaN(suma) ? 0 : suma,
                            moneda: record["Moneda"] || "RON",
                            description: record["Descrierea tranzactiei"] || "",
                            tip,
                            categorie,
                            subcategorie,
                            source: "csv"
                        });
                    }

                    setMessage("Import successful");
                } catch (err) {
                    console.error(err);
                    setMessage("Error during import");
                }
            },
        });
    };

    return (
        <div>
            <h2>Importă CSV</h2>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleUpload}>Import</button>
            {message && <p>{message}</p>}
        </div>
    );
}
