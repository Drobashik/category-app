import React from "react";
import ReactDOM from "react-dom/client";
import { Container } from "./components/Container";
import "./styles/_main.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Container />
  </React.StrictMode>
);
