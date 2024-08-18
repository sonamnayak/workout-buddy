import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { WorkoutsContextProvider } from "./context/workoutsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WorkoutsContextProvider>
      <App />
    </WorkoutsContextProvider>
  </StrictMode>
);
