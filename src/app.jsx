import { useState } from "preact/hooks";
import "./app.css";
import axios from "axios";
import { Button, Container, TextField, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./home";

export function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
