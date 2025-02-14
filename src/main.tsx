import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.tsx";
import { GlobalProvider } from "./GlobalContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalProvider>
      <Toaster position="bottom-right" reverseOrder={false} />
      <App />
    </GlobalProvider>
  </StrictMode>
);
