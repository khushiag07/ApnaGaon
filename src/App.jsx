
import { AppProvider } from "./context/AppContext";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
