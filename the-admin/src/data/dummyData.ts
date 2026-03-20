// Fallback data used if API fetch fails

export const dummyStats = {
  loans_disbursed: 15,
  loans_disbursed_initials: 'K',
  repayment_rate: 87,
  total_disbursed: 12,
  locations_served: 35,
  serving_hours: '24/7',
  serving_days: '7',
  active_users: 50,
  active_users_initials: 'K',
  total_clients: 850,
  total_clients_initials: '+',
};

export const dummyWhatWeDo = [
  { id: 1, image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=700&auto=format&fit=crop&q=80', blur_image: '', title: 'Crop Production Loans' },
  { id: 2, image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&auto=format&fit=crop&q=80', blur_image: '', title: 'Livestock Financing' },
  { id: 3, image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=600&auto=format&fit=crop&q=80', blur_image: '', title: 'Equipment Leasing' },
  { id: 4, image: 'https://images.unsplash.com/photo-1504387103978-e4ee71416c38?w=600&auto=format&fit=crop&q=80', blur_image: '', title: 'Coffee & Export Crops' },
  { id: 5, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop&q=80', blur_image: '', title: 'Farm Infrastructure' },
];

export const dummyTestimonies = [
  { id: 1, name: 'Sarah Namukasa', bio: 'Rwamps FC helped me grow my poultry farm from 200 to 2,000 birds.', occupation: 'Poultry Farmer, Kampala', loan_purpose: 'Agribusiness', initials: 'SN', card_color: '#248F36' },
  { id: 2, name: 'David Okello', bio: 'With asset financing, I purchased a tractor that transformed my business.', occupation: 'Commercial Farmer, Lira', loan_purpose: 'Trade Finance', initials: 'DO', card_color: '#1A3A8A' },
  { id: 3, name: 'Grace Akello', bio: "Rwamps FC's support for my coffee export business has been incredible.", occupation: 'Coffee Exporter, Mbale', loan_purpose: 'Growth Loan', initials: 'GA', card_color: '#7A2D08' },
];

export const dummyPartners = [
  { id: 1, client: 'MCE Social Capital' },
  { id: 2, client: 'MicroVest' },
  { id: 3, client: 'Musoni BV' },
];

export const dummyFooterSocials = {
  twitter: 'https://twitter.com/rwampsfc',
  linkedin: 'https://linkedin.com/company/rwampsfc',
  facebook: 'https://facebook.com/rwampsfc',
  email: 'info@rwampsfc.com',
};





export const dummyMessages = [
  { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Loan inquiry', message: 'I would like to inquire about your crop production loans. What are the requirements?', phone_number: '+256700000001', isRead: false, isDeleted: false },
  { id: 2, name: 'Mary Jane', email: 'mary@example.com', subject: 'Partnership proposal', message: 'We are interested in partnering with Rwamps FC for our agricultural project in Western Uganda.', phone_number: '+256700000002', isRead: true, isDeleted: false },
  { id: 3, name: 'Peter Smith', email: 'peter@example.com', subject: 'Branch visit', message: 'I plan to visit the Mbarara branch next week. What are the operating hours?', phone_number: '+256700000003', isRead: false, isDeleted: false },
];



export const dummySettings = {
  email: 'admin@rwampsfc.com',
  username: 'Admin User',
};
