import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./style.css";

const element = document.getElementById("root");
if (!element) {
  throw new Error("Root element not found");
}

createRoot(element).render(
  <StrictMode>
    <div className="dark min-h-screen bg-background p-4 text-foreground">
      <App />
    </div>
  </StrictMode>
);
