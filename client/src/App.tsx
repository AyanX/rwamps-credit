import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import Index from "./pages/Index.tsx";
import { lazy, Suspense } from "react";
//lazy loaded pages
const AboutPage =lazy(() => import("./pages/AboutPage.tsx"));
const ServicesPage = lazy(() => import("./pages/ServicesPage.tsx"));
const ProductsPage = lazy(() => import("./pages/ProductsPage.tsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"));
const LoansPage = lazy(() => import("./pages/LoansPage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

import Loader from "./components/Loader.tsx";

import ScrollToTop from "./components/ScrollToTop.tsx";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";

const Layout = () => (
  <div>
    <Navbar/>
    {<Outlet/>}
    <Footer/>
  </div>
);


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DataProvider>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route element={<Layout />} errorElement={<NotFound />}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<Suspense fallback={<Loader />}><AboutPage /></Suspense>} />
              <Route path="/services" element={<Suspense fallback={<Loader />}><ServicesPage /></Suspense>} />
              <Route path="/products" element={<Suspense fallback={<Loader />}><ProductsPage /></Suspense>} />
              <Route path="/loans" element={<Suspense fallback={<Loader />}><LoansPage /></Suspense>} />
              <Route path="/contact" element={<Suspense fallback={<Loader />}><ContactPage /></Suspense>} />
              <Route path="*" element={<Index/>} />
            </Route>
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </DataProvider>
  </QueryClientProvider>
);

export default App;
