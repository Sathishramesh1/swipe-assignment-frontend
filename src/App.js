import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import Invoice from "./pages/Invoice";
import InvoiceList from "./pages/InvoiceList";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProudct";

const App = () => {
  return (
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
      <Container>
        <Routes>
          <Route path="/" element={<InvoiceList />} />
          <Route path="/create" element={<Invoice />} />
          <Route path="/create/:id" element={<Invoice />} />
          <Route path="/edit/:id" element={<Invoice />} />
          <Route path="/products" element={<Products />} />
          <Route path="/addProduct" element={<CreateProduct/>}/>
          <Route path="/editProduct/:id" element={<CreateProduct />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
