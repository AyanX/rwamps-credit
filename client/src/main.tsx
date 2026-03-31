import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.scss";
import ScrollToTop from "./components/ScrollToTop.tsx";
import { HelmetProvider } from "react-helmet-async";
createRoot(document.getElementById("root")!).render(
    <HelmetProvider>
    <App />
    </HelmetProvider>

);
