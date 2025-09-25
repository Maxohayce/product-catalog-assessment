# Devstore – Responsive Product Catalog

A responsive product catalog interface built with React, TailwindCSS, and the Fake Store API.  
Users can **browse, search, filter, and sort** products, with additional features like cart persistence and product detail modals.

---

## 🚀 Features

- Responsive grid product catalog
- Product details: image, title, category, price
- Search (real-time)
- Filtering
  - By category
  - By price range
- Sorting
  - Price (low → high, high → low)
  - Name (A-Z, Z-A)
- Active filters display with clear option
- Cart functionality
  - Add to cart
  - Persistent with localStorage
  - Cart item count in header
- Product detail modal
- Dark/light mode toggle
- URL state management (filters persist on refresh)
- Loading, error, and empty states

---

## 🛠️ Technology Stack

- **React (Vite)**
- **TailwindCSS** for styling
- **Axios** for API requests
- **React Router** for navigation
- **query-string** for URL state management

---

## ⚙️ Setup & Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/mystore.git
   cd mystore
   ```

2. yarn install

3. yarn dev

## Assumptions

1. Fake Store API provides a small dataset (20 products) – client-side filtering is acceptable.
2. Cart persistence only requires localStorage (no backend).
3. Filters and sort state are stored in the URL query string for refresh persistence.
4. Accessibility is important: semantic HTML, alt attributes, aria-labels are included.

## Time Spent

plus or minus 14hrs including planning, development and documentation.

## [Live Demo Link](https://product-catalog-harmony.netlify.app/)
