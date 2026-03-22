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
  siteStats as fallbackStats,
  agriBandCards as fallbackWhatWeDo,
  testimonies as fallbackTestimonies,
  partners as fallbackPartners,
  footerSocials as fallbackSocials,
  agriculturalFinanceProducts as fallbackProducts,
  branches as fallbackBranches,
  faqs as fallbackFaqs,
  aboutMissionVision,
  servicesData as fallbackServices,
  loansData as fallbackLoans,
  contactInfo as fallbackContactInfo,
} from "@/data/siteData";

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
        // Fallback to local data
        setData({
          stats: fallbackStats as unknown as Stats,
          whatWeDo: fallbackWhatWeDo as unknown as WhatWeDoItem[],
          testimonies: fallbackTestimonies as unknown as Testimony[],
          partners: fallbackPartners,
          footerSocials: { ...fallbackSocials, email: fallbackContactInfo.email },
          products: fallbackProducts as unknown as Product[],
          branches: fallbackBranches.map((b) => ({
            ...b,
            phone_number: b.phone_number.join(", "),
          })) as unknown as Branch[],
          faqs: fallbackFaqs,
          about: [
            {
              ...aboutMissionVision.mission,
              name: "mission",
              text_color: "#ffffff",
            },
            {
              ...aboutMissionVision.vision,
              name: "vision",
              text_color: "#ffffff",
            },
          ] as unknown as AboutItem[],
          services: fallbackServices as unknown as Service[],
          loans: fallbackLoans.map((l) => ({ ...l, "sub-title": l.subtitle })) as unknown as Loan[],
          contactInfo: fallbackContactInfo,
          loading: false,
          error: "Using offline data",
        });
      });
  }, []);

  if (data.loading) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: "1.5rem",
        background: "hsl(45, 30%, 96%)",
      }}>
        <img
          src="https://ik.imagekit.io/59p9lo9mv/rwamps%20finance/ll.png"
          alt="Rwamps Credit Finance"
          style={{ width: "80px", height: "80px", borderRadius: "50%" }}
        />
        <PuffLoader color="hsl(145, 63%, 32%)" size={60} />
        <p style={{ color: "hsl(210, 30%, 15%)", fontFamily: "Poppins, sans-serif", fontSize: "0.875rem" }}>
          Loading...
        </p>
      </div>
    );
  }

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
