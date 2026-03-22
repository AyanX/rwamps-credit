
export interface Stats {
  loans_disbursed: number;
  loans_disbursed_initials: string;
  repayment_rate: number;
  total_disbursed: number;
  locations_served: number;
  serving_hours: string;
  serving_days: string;
  active_users: number;
  active_users_initials: string;
  total_clients: number;
  total_clients_initials: string;
}

export interface WhatWeDoItem {
  id: number;
  image: string;
  blur_image: string;
  title: string;
}

export interface Testimony {
  id: number;
  name: string;
  bio: string;
  occupation: string;
  loan_purpose: string;
  initials: string;
  card_color: string;
  text_color: string;
  loan_purpose_text_color: string;
  initials_bg_color: string;
}

export interface Partner {
  id: number;
  client: string;
}

export interface FooterSocials {
  twitter: string;
  linkedin: string;
  facebook: string;
  email: string;
}

export interface Product {
  id: number;
  icon: string;
  title: string;
  content: string;
  points: string[];
  bg_color: string;
  text_color: string; // New field
}

export interface Branch {
  id: number;
  branch_name: string;
  location: string;
  phone_number: string;
  email: string;
  website: string;
  open_time: string;
  close_time: string;
}

export interface Faq {
  id: number;
  title: string;
  content: string;
}

export interface AboutItem {
  id: number;
  name: string;
  icon: string;
  title: string;
  content: string;
  bg_color: string;
  text_color: string; // New field: text color for mission/vision cards
}

export interface Service {
  id: number;
  image: string;
  blur_image: string;
  title: string;
  content: string;
  icon: string;
  points: string[];
}

export interface Loan {
  id?: number;
  title: string;
  "sub-title": string;
  content: string;
  card_one_title: string;
  card_one_content: string;
  card_one_loan_amount_start: string;
  card_one_loan_amount_end: string;
  card_one_duration_start: string;
  card_one_duration_end: string;
  card_one_eligibility: string;
  card_one_bg_color: string;
  card_one_text_color: string;
  card_two_title: string;
  card_two_content: string;
  card_two_loan_amount_start: string;
  card_two_loan_amount_end: string;
  card_two_duration_start: string;
  card_two_duration_end: string;
  card_two_eligibility: string;
  card_two_bg_color: string;
  card_two_text_color: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone_number: string;
  subject: string;
  message: string;
}
