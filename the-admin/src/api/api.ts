import axios from 'axios';

// base axios instance with credentials
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:9000/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export const api = {
  get: {
    // homepage data
    stats: async () => http.get('/homepage/stats'),
    whatWeDo: async () => http.get('/homepage/what-we-do'),
    testimonies: async () => http.get('/homepage/testimonies'),
    partners: async () => http.get('/homepage/partners'),
    footerSocials: async () => http.get('/homepage/footer-socials'),

    // products
    products: async () => http.get('/products'),

    // contacts
    branches: async () => http.get('/contacts/branches'),
    faqs: async () => http.get('/contacts/faqs'),
    messages: async () => http.get('/messages'),

    // about
    about: async () => http.get('/about'),

    // services
    services: async () => http.get('/services'),

    // loans
    loans: async () => http.get('/loans'),

    // settings — returns { email, username }
    settings: async () => http.get('/auth'),

    // email settings
    email: async () => http.get('/auth/email'),
  },

  post: {
    login: async (email: string, password: string) => http.post('/auth/login', { email, password }),
    logout: async () => http.post('/auth/logout'),
    forgotPassword: async (pin: string) => http.post('/auth/forgot-password', { pin }),
    resetPassword: async (data: { password: string; new_password: string; token: string }) => http.post('/new-password', data),
    whatWeDo: async (data: FormData) => http.post('/homepage/what-we-do', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
    testimony: async (data: Record<string, unknown>) => http.post('/homepage/testimonies', data),
    partner: async (data: Record<string, unknown>) => http.post('/homepage/partners', data),
    product: async (data: Record<string, unknown>) => http.post('/products', data),
    branch: async (data: Record<string, unknown>) => http.post('/contacts/branches', data),
    faq: async (data: Record<string, unknown>) => http.post('/contacts/faqs', data),
    service: async (data: FormData) => http.post('/services', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
    loan: async (data: Record<string, unknown>) => http.post('/loans', data),
    email: async (data: Record<string, unknown>) => http.post('/auth/email', data),
  },

  put: {
    stats: async (data: Record<string, unknown>) => http.put('/homepage/stats', data),
    whatWeDo: async (id: number, data: FormData) => http.put(`/homepage/what-we-do/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
    testimony: async (id: number, data: Record<string, unknown>) => http.put(`/homepage/testimonies/${id}`, data),
    partner: async (id: number, data: Record<string, unknown>) => http.put(`/homepage/partners/${id}`, data),
    footerSocials: async (data: Record<string, unknown>) => http.put('/homepage/footer-socials', data),
    product: async (id: number, data: Record<string, unknown>) => http.put(`/products/${id}`, data),
    branch: async (id: number, data: Record<string, unknown>) => http.put(`/contacts/branches/${id}`, data),
    faq: async (id: number, data: Record<string, unknown>) => http.put(`/contacts/faqs/${id}`, data),
    messages: async (id: number) => http.post(`http://localhost:9000/messages/read/${id}`),
    about: async (data: Record<string, unknown>) => http.put('/about', data),
    service: async (id: number, data: FormData) => http.put(`/services/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
    loan: async (id: number, data: Record<string, unknown>) => http.put(`/loans/${id}`, data),
    settings: async (data: Record<string, unknown>) => http.put('/auth', data),
    pin: async (data: Record<string, unknown>) => http.put('/auth/pin', data),
    password: async (data: Record<string, unknown>) => http.put('/auth/reset-password', data),
  },

  delete: {
    whatWeDo: async (id: number) => http.delete(`/homepage/what-we-do/${id}`),
    testimony: async (id: number) => http.delete(`/homepage/testimonies/${id}`),
    partner: async (id: number) => http.delete(`/homepage/partners/${id}`),
    product: async (id: number) => http.delete(`/products/${id}`),
    branch: async (id: number) => http.delete(`/contacts/branches/${id}`),
    faq: async (id: number) => http.delete(`/contacts/faqs/${id}`),
    message: async (id: number) => http.delete(`http://localhost:9000/messages/delete/${id}`),
    service: async (id: number) => http.delete(`/services/${id}`),
    loan: async (id: number) => http.delete(`/loans/${id}`),
    about: async (id: number) => http.delete(`/about/${id}`),
  },
};
