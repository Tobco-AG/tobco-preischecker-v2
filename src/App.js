import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EanSearchPage from "@/pages/EanSearchPage";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EanSearchPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
