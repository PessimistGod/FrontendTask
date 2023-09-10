import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from './AppLayout';
import Landing from './Pages/Landing';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormPage from './Pages/PurchaseForm/FormPage';
import InvalidPage from './InvalidPage';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
        <Route index element={<Landing />}></Route>
        <Route path="/form" element={<FormPage />} > </Route>
        <Route path="*" element={<InvalidPage />} ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
