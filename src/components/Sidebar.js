import { NavLink } from "react-router-dom";
import { FaHome, FaTable } from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="brand">
                <h1>💼 Wave Notion</h1>
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
            </nav>
        </aside>
    );
}
