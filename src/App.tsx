import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../src/pages/Auth";
import Login from "../src/components/Login";
import Dashboard from "../src/pages/Dashboard";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route index element={<Login />} />
        </Route>

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
