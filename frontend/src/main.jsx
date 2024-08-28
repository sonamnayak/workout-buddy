import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import { WorkoutsContextProvider } from "./context/workoutsContext.jsx";
// import { AuthContextProvider } from "./context/authContext.jsx";
import { Provider } from "react-redux";
import store from "./store/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <AuthContextProvider>
      <WorkoutsContextProvider>
        <App />
      </WorkoutsContextProvider>
    </AuthContextProvider> */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
