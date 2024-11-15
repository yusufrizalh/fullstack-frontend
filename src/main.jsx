//* import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//* import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
// import { AuthContext } from "./helpers/AuthContext";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);
