import ReactDOM from "react-dom/client";
import { Container } from "./components/Container";
import "./styles/_main.scss";
import { PositionProvider } from "./context/positionContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <PositionProvider>
    <Container />
  </PositionProvider>
);
