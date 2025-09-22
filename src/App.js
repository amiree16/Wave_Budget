import './index.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar"
import TablePage from "./pages/TablePage";

function App() {
  return (
      <Router>
        <div className="layout">
          <Sidebar/>
          <main className="content">
            <Routes>
              <Route path="/" element={<Home/>}/>
                <Route path="/table" element={<TablePage />} />
            </Routes>
          </main>
        </div>
      </Router>
  );
}
export default App;
