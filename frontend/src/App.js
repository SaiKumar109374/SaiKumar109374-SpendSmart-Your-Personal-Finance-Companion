import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "daisyui";
import Incomes from "./pages/Incomes";
import Expenses from "./pages/Expenses";
import CurrencyConverter from "./pages/CurrencyConverter";

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/incomes" element={<Incomes />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/CurrencyConverter" element={<CurrencyConverter />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
