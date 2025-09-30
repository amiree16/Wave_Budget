import "./ManualEntryForm.css";
import { useState } from "react";
import axios from "axios";

export default function ManualEntryForm() {
    const [form, setForm] = useState({
        nume_cont_propriu: "",
        cont_propriu: "",
        data_inregistrarii: "",
        suma: "",
        moneda: "RON",
        description: "",
        tip: "Income",
        nume_partener: "",
        iban_partener: "",
        bic_partener: "",
        cod_banca_partener: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/transactions", form);
            console.log("Saved:", response.data);
            alert("Tranzacția a fost salvată cu succes!");

            setForm({
                nume_cont_propriu: "",
                cont_propriu: "",
                data_inregistrarii: "",
                suma: "",
                moneda: "RON",
                description: "",
                tip: "Income",
                nume_partener: "",
                iban_partener: "",
                bic_partener: "",
                cod_banca_partener: "",
            });

        } catch (error) {
            console.error("Eroare la trimiterea datelor:", error);
            alert("A apărut o eroare. Încearcă din nou.");
        }
    };


    return (
        <form className="manual-form" onSubmit={handleSubmit}>
            <h2>Adaugă Tranzacție Manual</h2>

            <div className="form-grid">
                <div className="form-group">
                    <label>Nume Cont Propriu *</label>
                    <input name="nume_cont_propriu" required value={form.nume_cont_propriu} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>IBAN Cont Propriu *</label>
                    <input name="cont_propriu" required value={form.cont_propriu} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Data Înregistrării *</label>
                    <input type="date" name="data_inregistrarii" required value={form.data_inregistrarii} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Sumă *</label>
                    <input type="number" name="suma" required value={form.suma} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Monedă *</label>
                    <select name="moneda" required value={form.moneda} onChange={handleChange}>
                        <option value="RON">RON</option>
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Descriere *</label>
                    <input name="description" required value={form.description} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Tip *</label>
                    <select name="tip" required value={form.tip} onChange={handleChange}>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Nume Partener</label>
                    <input name="nume_partener" value={form.nume_partener} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>IBAN Partener</label>
                    <input name="iban_partener" value={form.iban_partener} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Cod BIC Partener</label>
                    <input name="bic_partener" value={form.bic_partener} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Cod Bancă Partener</label>
                    <input name="cod_banca_partener" value={form.cod_banca_partener} onChange={handleChange} />
                </div>
            </div>

            <button className="save-btn" type="submit">Salvează</button>
        </form>
    );
}
