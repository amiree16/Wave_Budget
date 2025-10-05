import './index.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar"
import TablePage from "./pages/TablePage";
import ManualEntryPage from "./pages/ManualEntryPage";
import CsvImportPage from "./pages/CsvImportPage";
import Expenses from "./pages/Expenses";
import Income from "./pages/Income";
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
                  <Route path="/expenses" element={<Expenses/>}/>
                  <Route path="/income" element={<Income/>}/>

              </Routes>
          </main>
        </div>
      </Router>
  );
}
export default App;
