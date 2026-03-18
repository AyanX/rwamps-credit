import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../api/api';
import {
  dummyStats, dummyWhatWeDo, dummyTestimonies, dummyPartners,
  dummyFooterSocials,dummyBranches,
  dummyMessages, dummyAbout, dummyServices,  dummySettings,
} from '../data/dummyData';
import { toast } from '../components/Toast';

// types for our data
export interface Stats {
  loans_disbursed: number; loans_disbursed_initials: string;
  repayment_rate: number; total_disbursed: number;
  locations_served: number; serving_hours: string; serving_days: string;
  active_users: number; active_users_initials: string;
  total_clients: number; total_clients_initials: string;
}
export interface WhatWeDoItem { id: number; image: string; blur_image: string; title: string; }
export interface Testimony { id: number; name: string; bio: string; occupation: string; loan_purpose: string; initials: string; card_color: string; }
export interface Partner { id: number; client: string; }
export interface FooterSocials { twitter: string; linkedin: string; facebook: string; email: string; }
export interface Product { id: number; icon: string; title: string; content: string; points: string[]; bg_color: string; }
export interface Branch { id: number; branch_name: string; location: string; phone_number: string; email: string; website: string; open_time: string; close_time: string; }
export interface Faq { id: number; title: string; content: string; }
export interface Message { id: number; email: string; subject: string; message: string; phone_number: string; isRead: boolean; isDeleted: boolean; }
export interface AboutSection { mission: { id: number; icon: string; title: string; content: string; bg_color: string; }; vision: { id: number; icon: string; title: string; content: string; bg_color: string; }; }
export interface Service { id: number; image: string; blur_image: string; title: string; content: string; icon: string; points: string[]; }
export interface Loan {
  id?: number; title: string; 'sub-title': string; content: string;
  card_one_title: string; card_one_content: string;
  card_one_loan_amount_start: string; card_one_loan_amount_end: string;
  card_one_duration_start: string; card_one_duration_end: string;
  card_one_eligibility: string; card_one_bg_color: string; card_one_text_color: string;
  card_two_title: string; card_two_content: string;
  card_two_loan_amount_start: string; card_two_loan_amount_end: string;
  card_two_duration_start: string; card_two_duration_end: string;
  card_two_eligibility: string; card_two_bg_color: string; card_two_text_color: string;
}

interface DataContextType {
  stats: Stats; setStats: React.Dispatch<React.SetStateAction<Stats>>;
  whatWeDo: WhatWeDoItem[]; setWhatWeDo: React.Dispatch<React.SetStateAction<WhatWeDoItem[]>>;
  testimonies: Testimony[]; setTestimonies: React.Dispatch<React.SetStateAction<Testimony[]>>;
  partners: Partner[]; setPartners: React.Dispatch<React.SetStateAction<Partner[]>>;
  footerSocials: FooterSocials; setFooterSocials: React.Dispatch<React.SetStateAction<FooterSocials>>;
  products: Product[]; setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  branches: Branch[]; setBranches: React.Dispatch<React.SetStateAction<Branch[]>>;
  faqs: Faq[]; setFaqs: React.Dispatch<React.SetStateAction<Faq[]>>;
  messages: Message[]; setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  about: AboutSection; setAbout: React.Dispatch<React.SetStateAction<AboutSection>>;
  services: Service[]; setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  loans: Loan[]; setLoans: React.Dispatch<React.SetStateAction<Loan[]>>;
  settingsEmail: string; setSettingsEmail: React.Dispatch<React.SetStateAction<string>>;
  settingsUsername: string; setSettingsUsername: React.Dispatch<React.SetStateAction<string>>;
  dataLoading: boolean;
  refetchData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used inside DataProvider');
  return ctx;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [stats, setStats] = useState<Stats>(dummyStats);
  const [whatWeDo, setWhatWeDo] = useState<WhatWeDoItem[]>(dummyWhatWeDo);
  const [testimonies, setTestimonies] = useState<Testimony[]>(dummyTestimonies);
  const [partners, setPartners] = useState<Partner[]>(dummyPartners);
  const [footerSocials, setFooterSocials] = useState<FooterSocials>(dummyFooterSocials);
  const [products, setProducts] = useState<Product[]>([]);
  const [branches, setBranches] = useState<Branch[]>(dummyBranches);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [messages, setMessages] = useState<Message[]>(dummyMessages);
  const [about, setAbout] = useState<AboutSection>(dummyAbout);
  const [services, setServices] = useState<Service[]>(dummyServices);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [settingsEmail, setSettingsEmail] = useState(dummySettings.email);
  const [settingsUsername, setSettingsUsername] = useState(dummySettings.username);
  const [dataLoading, setDataLoading] = useState(true);

  const fetchAll = async () => {
    setDataLoading(true);
    try {
      const [
        statsRes, whatWeDoRes, testimoniesRes, partnersRes,
        footerSocialsRes, productsRes, branchesRes, faqsRes,
        messagesRes, aboutRes, servicesRes, loansRes, settingsRes,
      ] = await Promise.all([
        api.get.stats().catch(() => null),
        api.get.whatWeDo().catch(() => null),
        api.get.testimonies().catch(() => null),
        api.get.partners().catch(() => null),
        api.get.footerSocials().catch(() => null),
        api.get.products().catch(() => null),
        api.get.branches().catch(() => null),
        api.get.faqs().catch(() => null),
        api.get.messages().catch(() => null),
        api.get.about().catch(() => null),
        api.get.services().catch(() => null),
        api.get.loans().catch(() => null),
        api.get.settings().catch(() => null),
      ]);

      // use fetched data if available, otherwise keep dummy fallback
      if (statsRes?.data) setStats(statsRes.data.data || statsRes.data);
      if (whatWeDoRes?.data) setWhatWeDo(whatWeDoRes.data.data || whatWeDoRes.data);
      if (testimoniesRes?.data) setTestimonies(testimoniesRes.data.data || testimoniesRes.data);
      if (partnersRes?.data) setPartners(partnersRes.data.data || partnersRes.data);
      if (footerSocialsRes?.data) setFooterSocials(footerSocialsRes.data.data || footerSocialsRes.data);
      if (productsRes?.data) setProducts(productsRes.data.data || productsRes.data);
      if (branchesRes?.data) setBranches(branchesRes.data.data || branchesRes.data);
      if (faqsRes?.data) setFaqs(faqsRes.data.data || faqsRes.data);
      if (messagesRes?.data) setMessages(messagesRes.data.data || messagesRes.data  );
      if (aboutRes?.data) setAbout(aboutRes.data.data || aboutRes.data);
      if (servicesRes?.data) setServices(servicesRes.data.data || servicesRes.data);
      if (loansRes?.data) setLoans(loansRes.data.data || loansRes.data);
      if (settingsRes?.data) {
        setSettingsEmail(settingsRes.data?.data?.email || dummySettings.email);
        setSettingsUsername(settingsRes.data?.data?.username || dummySettings.username);
      }
    } catch {
      toast.error('Failed to fetch data. Using fallback data.');
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  return (
    <DataContext.Provider value={{
      stats, setStats, whatWeDo, setWhatWeDo, testimonies, setTestimonies,
      partners, setPartners, footerSocials, setFooterSocials, products, setProducts,
      branches, setBranches, faqs, setFaqs, messages, setMessages,
      about, setAbout, services, setServices, loans, setLoans,
      settingsEmail, setSettingsEmail, settingsUsername, setSettingsUsername,
      dataLoading, refetchData: fetchAll,
    }}>
      {children}
    </DataContext.Provider>
  );
};
