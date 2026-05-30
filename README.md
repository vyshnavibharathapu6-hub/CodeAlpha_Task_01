# 🛒 Amazon Alpha - Full Stack E-Commerce Platform

Welcome to **Amazon Alpha**, an interactive, full-stack shopping marketplace interface engineered as part of the **CodeAlpha Full-Stack Web Development Internship**. This application replicates core customer workflows from premium e-commerce systems like Amazon, including user session authorization, real-time inventory searching, complex catalog rendering, and interactive cart/checkout operations.

---

## 🚀 Visual Features & System Components

Amazon Alpha utilizes a sleek layout styled completely around a responsive, high-fidelity dark header and warm marketplace accent system:

*   **Centric Authorization Gateway**: A clean, secure sign-in card interface managing isolated login and profile registration workflows.
*   **Live Marketplace Search Engine**: An instant filter system allowing users to search across active store items dynamically without reloading the document.
*   **Dual-State Checkout & Profile Hub**: A unique multi-mode dashboard architecture that dynamically transitions between an aggregated cart overview with absolute subtotal calculators and a custom-tailored "Amazon Prime Member" settings profile.
*   **Persistent Navigation Node**: A sticky mobile-first structural utility navigation bar at the bottom containing interactive coupons (`CLASHALPHA2026`) and category links.

---

## 🛠️ The Tech Stack Architecture

The application operates on an unified MVC (Model-View-Controller) layer engineered for optimal performance and rapid local prototyping:

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Backend Controller** | Node.js + Express.js | Directs server sessions, encrypted routing scopes, and relational population rules. |
| **Database Layer** | MongoDB + Mongoose | Houses data definitions for scalable product documents and embedded shopping arrays. |
| **View Template Engine** | EJS (Embedded JavaScript) | Dynamically compiles inventory objects and state triggers straight into clean markup variables. |
| **Frontend Framework** | Bootstrap 5 + Custom CSS | Powers the product grid layout, card transform hover behaviors, and responsive margins. |
| **Authentication Hash** | Bcrypt.js | Enforces account security protocol via automated cryptographic salting. |

---

## 📂 Structural File Scaffolding

```text
CodeAlpha_Ecommerce_Store/
├── node_modules/             # Local system package dependencies
├── views/
│   ├── auth.ejs              # Amazon-inspired centered gateway card
│   ├── index.ejs             # Primary product catalog feed, search bar, & bottom nav
│   ├── cart.ejs              # Dual-state shopping cart reviewer & account dashboard
├── server.js                 # Central backend controller, Mongo configuration, & database seeding
├── package.json              # Main project infrastructure configuration manifest
└── README.md                 # Technical project documentation
