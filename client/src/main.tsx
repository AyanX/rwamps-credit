import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.scss";
import ScrollToTop from "./components/ScrollToTop.tsx";

createRoot(document.getElementById("root")!).render(

    <App />

);
