import React from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App.tsx";
import "../client/src/styles/index.css";


const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
