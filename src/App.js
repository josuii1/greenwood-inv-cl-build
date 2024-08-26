import React from "react";
import NavigationBar from "./Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./components/PrivateRoute";
import Invoices from "./pages/Invoices";
import CreateInvoice from "./pages/CreateInvoice";
import NewUser from "./pages/NewUser";
import Login from "./pages/Login";
import PrintInvoicePage from "./components/PrintInvoicePage";
function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Invoices />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/createinvoice" element={<CreateInvoice />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/register" element={<NewUser />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route
              path="/printinvoice/:invoiceNumber"
              element={<PrintInvoicePage />}
            />{" "}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
