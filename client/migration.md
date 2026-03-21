# Migration Guide - API GET Endpoints

This document lists all GET API endpoints used by the admin dashboard front-end (from `src/api/api.ts`) and includes example request/response formats.

## Base URL
- `VITE_API_URL` (runtime) or fallback: `http://localhost:9000/api`

## 1. Homepage Stats
- URL: `GET /homepage/stats`
- Example request: `GET http://localhost:9000/api/homepage/stats`
- Example response:
  ```json
  {
    "data": { "users": 1200, "revenue": 154000, "transactions": 4500 },
    "message": "Homepage stats loaded"
  }
  ```

## 2. What We Do
- URL: `GET /homepage/what-we-do`
- Example response:
  ```json
  {
    "data": [
      { "id": 1, "title": "Lending", "description": "Fast loans", "icon": "loan.svg" }
    ],
    "message": "What we do loaded"
  }
  ```

## 3. Testimonies
- URL: `GET /homepage/testimonies`
- Example response:
  ```json
  {
    "data": [
      { "id": 1, "name": "Jane Doe", "text": "Great service!" }
    ],
    "message": "Testimonies loaded"
  }
  ```

## 4. Partners
- URL: `GET /homepage/partners`
- Example response:
  ```json
  {
    "data": [{ "id": 1, "name": "Bank X", "logo": "/img/bankx.svg" }],
    "message": "Partners loaded"
  }
  ```

## 5. Footer Socials
- URL: `GET /homepage/footer-socials`
- Example response:
  ```json
  {
    "data": {
      "email": "contact@company.com",
      "twitter": "https://twitter.com/company",
      "linkedin": "https://linkedin.com/company",
      "facebook": "https://facebook.com/company"
    },
    "message": "Footer socials loaded"
  }
  ```

## 6. Products
- URL: `GET /products`
- Example response:
  ```json
  {
    "data": [{ "id": 1, "name": "Loan A", "rate": 8.5 }],
    "message": "Products loaded"
  }
  ```

## 7. Branches
- URL: `GET /contacts/branches`
- Example response:
  ```json
  {
    "data": [{ "id": 1, "city": "Lagos", "address": "123 Main St" }],
    "message": "Branches loaded"
  }
  ```

## 8. FAQs
- URL: `GET /contacts/faqs`
- Example response:
  ```json
  {
    "data": [{ "id": 1, "q": "How?", "a": "..." }],
    "message": "FAQs loaded"
  }
  ```

## 9. Messages
- URL: `GET /messages`
- Example response:
  ```json
  {
    "data": [{ "id": 1, "from": "john", "text": "..." }],
    "message": "Messages loaded"
  }
  ```

## 10. About Content
- URL: `GET /about`
- Example response:
  ```json
  {
    "data": { "title": "About us", "body": "..." },
    "message": "About loaded"
  }
  ```

## 11. Services
- URL: `GET /services`
- Example response:
  ```json
  {
    "data": [{ "id": 1, "title": "Service A", "desc": "..." }],
    "message": "Services loaded"
  }
  ```

## 12. Loans
- URL: `GET /loans`
- Example response:
  ```json
  {
    "data": [{ "id": 1, "type": "Personal", "min": 100, "max": 10000 }],
    "message": "Loans loaded"
  }
  ```

## 13. Settings
- URL: `GET /auth`
- Example response:
  ```json
  {
    "data": { "username": "admin", "email": "admin@example.com" },
    "message": "User loaded"
  }
  ```

## 14. Email settings
- URL: `GET /auth/email`
- Example response:
  ```json
  {
    "data": { "email": "admin@example.com" },
    "message": "Email loaded"
  }
  ```

---

### Useful note
- Each endpoint in this project responds with a `data` object/array and a `message` string, matching your API usage patterns.
