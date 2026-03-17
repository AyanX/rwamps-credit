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

export const dummyProducts = [
  { id: 1, icon: 'Wheat', title: 'Crop Production Loans', content: 'Finance your planting seasons with flexible crop production loans.', points: ['Flexible repayment aligned with harvest cycles', 'Competitive interest rates', 'Quick disbursement', 'No collateral for small amounts'], bg_color: '#22C55E' },
  { id: 2, icon: 'Beef', title: 'Livestock Financing', content: 'Grow your livestock business with our tailored financing solutions.', points: ['Dairy farming support', 'Poultry enterprise loans', 'Cattle ranching finance', 'Veterinary cost coverage'], bg_color: '#0F172A' },
  { id: 3, icon: 'Tractor', title: 'Agricultural Equipment Loans', content: 'Modernize your farming operations with equipment financing.', points: ['Tractor financing', 'Irrigation systems', 'Processing equipment', 'Flexible terms up to 36 months'], bg_color: '#6B8E6B' },
  { id: 4, icon: 'Building2', title: 'Farm Infrastructure Loans', content: 'Build the foundation for agricultural success.', points: ['Storage facilities', 'Greenhouse construction', 'Water harvesting systems', 'Fencing & security'], bg_color: '#EA580C' },
];

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

export const dummyFaqs = [
  { id: 1, title: 'What documents do I need to apply for a loan?', content: 'You need a valid national ID, proof of income or business registration, and a completed loan application form.' },
  { id: 2, title: 'How long does loan approval take?', content: 'Most loans are approved within 24-48 hours of submitting a complete application.' },
  { id: 3, title: 'What interest rates do you offer?', content: 'Our interest rates vary depending on the loan type and duration. Contact us for specific rates.' },
  { id: 4, title: 'Can I repay my loan early?', content: 'Yes, early repayment is allowed with no additional penalties.' },
  { id: 5, title: 'Do you offer group loans?', content: 'Yes, we offer group lending for farmer cooperatives and business groups.' },
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

export const dummyLoans = [
  {
    id: 1, title: 'Business Loans', 'sub-title': 'Fueling Your Entrepreneurial Dreams',
    content: 'Ugandan entrepreneurs are driving economic growth, and we\'re here to support them.',
    card_one_title: 'ChapChap (Individual)', card_one_content: 'Empowering established business owners with flexible financing.',
    card_one_loan_amount_start: 'UGX 500,000', card_one_loan_amount_end: 'UGX 10,000,000',
    card_one_duration_start: '3', card_one_duration_end: '12', card_one_eligibility: 'Business must be in operation for at least 6 months.',
    card_one_bg_color: '#22C55E', card_one_text_color: '#FFFFFF',
    card_two_title: 'Bespoke Business Loan', card_two_content: 'Large-scale financing for established business owners.',
    card_two_loan_amount_start: 'UGX 10,000,000', card_two_loan_amount_end: 'UGX 200,000,000',
    card_two_duration_start: '1', card_two_duration_end: '6', card_two_eligibility: 'Business must be in operation for at least 12 months.',
    card_two_bg_color: '#0F172A', card_two_text_color: '#FFFFFF',
  },
  {
    id: 2, title: 'Agricultural Loans', 'sub-title': 'Financing Growth from the Ground Up',
    content: 'Farming is the backbone of Uganda\'s economy.',
    card_one_title: 'Crop Production Loan', card_one_content: 'Empowering individual farmers to scale up operations.',
    card_one_loan_amount_start: 'UGX 200,000', card_one_loan_amount_end: 'UGX 10,000,000',
    card_one_duration_start: '3', card_one_duration_end: '12', card_one_eligibility: 'Active farmer with proof of land access.',
    card_one_bg_color: '#22C55E', card_one_text_color: '#FFFFFF',
    card_two_title: 'Livestock Financing', card_two_content: 'Supporting dairy, poultry, and cattle farmers.',
    card_two_loan_amount_start: 'UGX 500,000', card_two_loan_amount_end: 'UGX 20,000,000',
    card_two_duration_start: '3', card_two_duration_end: '18', card_two_eligibility: 'Existing livestock farmer or verified new entrant.',
    card_two_bg_color: '#6B8E6B', card_two_text_color: '#FFFFFF',
  },
];

export const dummySettings = {
  email: 'admin@rwampsfc.com',
  username: 'Admin User',
};
