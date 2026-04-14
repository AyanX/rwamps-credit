import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { PuffLoader } from "react-spinners";
import { api } from "@/api/api";
import type {
  Stats,
  WhatWeDoItem,
  Testimony,
  Partner,
  FooterSocials,
  Product,
  Branch,
  Faq,
  AboutItem,
  Service,
  Loan,
} from "@/api/types";

// Fallback data from siteData for when API is unreachable
import {
  contactInfo as fallbackContactInfo,
} from "@/data/siteData";
import Loader from "@/components/Loader";

interface DataContextType {
  stats: Stats | null;
  whatWeDo: WhatWeDoItem[];
  testimonies: Testimony[];
  partners: Partner[];
  footerSocials: FooterSocials | null;
  products: Product[];
  branches: Branch[];
  faqs: Faq[];
  about: AboutItem[];
  services: Service[];
  loans: Loan[];
  contactInfo: typeof fallbackContactInfo;
  loading: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<DataContextType>({
    stats: null,
    whatWeDo: [],
    testimonies: [],
    partners: [],
    footerSocials: null,
    products: [],
    branches: [],
    faqs: [],
    about: [],
    services: [],
    loans: [],
    contactInfo: fallbackContactInfo,
    loading: true,
    error: null,
  });

  useEffect(() => {
    Promise.all([
      api.get.stats(),
      api.get.whatWeDo(),
      api.get.testimonies(),
      api.get.partners(),
      api.get.footerSocials(),
      api.get.products(),
      api.get.branches(),
      api.get.faqs(),
      api.get.about(),
      api.get.services(),
      api.get.loans(),
    ])
      .then(([stats, whatWeDo, testimonies, partners, footerSocials, products, branches, faqs, about, services, loans]) => {
        setData((prev) => ({
          ...prev,
          stats,
          whatWeDo,
          testimonies,
          partners,
          footerSocials,
          products,
          branches,
          faqs,
          about,
          services,
          loans,
          loading: false,
        }));
      })
      .catch(() => {
        setData((prev) => ({ ...prev, loading: false, error: "Failed to load data" }));
      });
  }, []);

  if (data.loading) {
   return <Loader/>
  }

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
