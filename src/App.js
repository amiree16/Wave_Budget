import './index.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar"
import TablePage from "./pages/TablePage";
import ManualEntryPage from "./pages/ManualEntryPage";
import CsvImportPage from "./pages/CsvImportPage";

function App() {
  return (
      <Router>
        <div className="layout">
          <Sidebar/>
          <main className="content">
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/table" element={<TablePage />} />
                  <Route path="/add-data/manual" element={<ManualEntryPage />} />
                  <Route path="/add-data/csv" element={<CsvImportPage />} />

              </Routes>
          </main>
        </div>
      </Router>
  );
}
export default App;
