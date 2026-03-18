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



export const dummyBranches = [
  {
    id: 1, branch_name: 'Kampala Branch', location: 'Block Number 245, Plot Number 508\nKansanga Ggaba Road\nNext to Hostel, Opposite Kinderkare School',
    phone_number: '+256 792 602 205', email: 'info@rwampscreditfinance.com', website: 'www.rwampscreditfinance.com',
    open_time: '09:00', close_time: '21:00',
  },
  {
    id: 2, branch_name: 'Mbarara Branch', location: 'Buremba Road\nMbarara, Uganda',
    phone_number: '+256 779 135 953', email: 'info@rwampscreditfinance.com', website: 'www.rwampscreditfinance.com',
    open_time: '09:00', close_time: '21:00',
  },
];

export const dummyMessages = [
  { id: 1, email: 'john@example.com', subject: 'Loan inquiry', message: 'I would like to inquire about your crop production loans. What are the requirements?', phone_number: '+256700000001', isRead: false, isDeleted: false },
  { id: 2, email: 'mary@example.com', subject: 'Partnership proposal', message: 'We are interested in partnering with Rwamps FC for our agricultural project in Western Uganda.', phone_number: '+256700000002', isRead: true, isDeleted: false },
  { id: 3, email: 'peter@example.com', subject: 'Branch visit', message: 'I plan to visit the Mbarara branch next week. What are the operating hours?', phone_number: '+256700000003', isRead: false, isDeleted: false },
];

export const dummyAbout = {
  mission: { id: 1, icon: 'Target', title: 'Our Mission', content: 'To empower small and medium-sized enterprises and farmers in Uganda by providing accessible and affordable credit solutions, fostering economic growth, and improving livelihoods.', bg_color: '#22C55E' },
  vision: { id: 2, icon: 'Telescope', title: 'Our Vision', content: 'To be the leading credit finance provider in Uganda, known for our commitment to customer satisfaction, community development, and sustainable economic impact.', bg_color: '#0F172A' },
};

export const dummyServices = [
  { id: 1, image: 'https://images.pexels.com/photos/210574/pexels-photo-210574.jpeg?auto=compress&cs=tinysrgb&w=800', blur_image: '', title: 'Foreign Exchange', content: 'Seamless foreign currency exchange services for all major global currencies.', icon: 'DollarSign', points: ['Competitive Rates', 'Fast and Efficient Service', 'Convenient Locations', 'All Major Currencies'] },
  { id: 2, image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800', blur_image: '', title: 'Money Transfers', content: 'Global money remittance via Western Union, MoneyGram and more.', icon: 'Send', points: ['Bank Transfer', 'MoneyGram', 'Western Union', 'Global Coverage'] },
  { id: 3, image: 'https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&w=800', blur_image: '', title: 'Mobile Money', content: 'Convenient Airtel Money, Mpesa and MTN Mobile Money services.', icon: 'Smartphone', points: ['MTN Mobile Money', 'Airtel Money', 'Mpesa', 'Instant Deposits & Withdrawals'] },
  { id: 4, image: 'https://images.pexels.com/photos/7821487/pexels-photo-7821487.jpeg?auto=compress&cs=tinysrgb&w=800', blur_image: '', title: 'Agent Banking', content: 'Banking services for deposits, tax payments, bills and utilities.', icon: 'Landmark', points: ['Equity Bank', 'KCB', 'Diamond Trust', 'Stanbic'] },
];



export const dummySettings = {
  email: 'admin@rwampsfc.com',
  username: 'Admin User',
};
