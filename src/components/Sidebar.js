import {
    FaArrowDown,
    FaArrowUp,
    FaExpeditedssl,
    FaHome,
    FaMoneyBillWave,
    FaMoneyBillWaveAlt,
    FaTable
} from "react-icons/fa";
import {FiPlusCircle} from "react-icons/fi";
import "./Sidebar.css";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {FaMoneyBillTrendUp} from "react-icons/fa6";

export default function Sidebar() {
    const [isAddOpen, setIsAddOpen] = useState(false);

    const location = useLocation();
    const isAddActive = location.pathname.startsWith("/add-data");
    return (
        <aside className="sidebar">
            <div className="brand">
                <h1>Wave Notion Labs</h1>
            </div>
            <nav className="menu">
                <NavLink to="/" end className="menu-item">
                    <FaHome className="icon" />
                    <span>Home</span>
                </NavLink>
                <NavLink to="/table" className="menu-item">
                    <FaTable className="icon" />
                    <span>Table</span>
                </NavLink>
                <NavLink to="/expenses" end className="menu-item">
                    <FaMoneyBillWave className="icon" />
                    <span>Expenses</span>
                </NavLink>
                <NavLink to="/income" end className="menu-item">
                    <FaMoneyBillTrendUp className="icon" />
                    <span>Income</span>
                </NavLink>
                <div
                    className={`menu-item ${isAddActive ? "active" : ""}`}
                    onClick={() => setIsAddOpen(prev => !prev)}
                >
                    <FiPlusCircle className="icon" />
                    <span>Add Transaction</span>
                </div>

                {isAddOpen && (
                    <div className="submenu">
                        <NavLink to="/add-data/manual" className="submenu-item">
                            Manual Entry
                        </NavLink>
                        <NavLink to="/add-data/csv" className="submenu-item">
                            CSV Import
                        </NavLink>
                    </div>
                )}


            </nav>
        </aside>
    );
}
