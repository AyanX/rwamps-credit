// ============================================================
// API Client — Rwamps FC
// ============================================================

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
  ContactMessage,
} from "./types";

const BASE_URL = "http://localhost:9000/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
  const data = await res.json();
  return data.data || data; 
}

export const api = {
  get: {
    stats: () => request<Stats>("/homepage/stats"),
    whatWeDo: () => request<WhatWeDoItem[]>("/homepage/what-we-do"),
    testimonies: () => request<Testimony[]>("/homepage/testimonies"),
    partners: () => request<Partner[]>("/homepage/partners"),
    footerSocials: () => request<FooterSocials>("/homepage/footer-socials"),
    products: () => request<Product[]>("/products"),
    branches: () => request<Branch[]>("/contacts/branches"),
    faqs: () => request<Faq[]>("/contacts/faqs"),
    about: () => request<AboutItem[]>("/about"),
    services: () => request<Service[]>("/services"),
    loans: () => request<Loan[]>("/loans"),
  },
  post: {
    messages: (data: ContactMessage) =>
      request<{ success: boolean }>("/messages", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
};
