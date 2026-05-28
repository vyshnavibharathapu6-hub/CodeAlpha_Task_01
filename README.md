# CodeAlpha_Ecommerce_Store

A full-stack, responsive E-Commerce application developed as part of the **CodeAlpha Web Development Internship**. This project is a dynamic web application built using the MERN stack (with EJS as the templating engine) that simulates a real-world online shopping experience.

---

## 🚀 Features

### **User Experience (Frontend)**
* **Interactive Storefront:** A clean, modern UI featuring structured product listings, category filters, and an intuitive search bar.
* **Product Enhancements:** Detailed product views equipped with user ratings, dynamic quantity selectors, and real-time updates.
* **Shopping Cart:** Fully functional cart system where users can add, update quantities, or remove items before proceeding to checkout.
* **Seamless Checkout:** A structured billing and checkout workflow to finalize mock purchases.
* **Responsive Navigation:** Optimized for both desktop and mobile views, featuring modern bottom navigation for mobile users.

### **Security & Backend Logic**
* **User Authentication:** Secure registration and login systems powered by `bcrypt` for password hashing and encryption.
* **Session Management:** Persistent login states across pages using `express-session`.
* **Robust Database:** Schema-driven data storage handling complex relations between Users, Products, and Cart items.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (ES6+), EJS (Embedded JavaScript Templates)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (with Mongoose ODM)
* **Authentication/Security:** Bcrypt, Express-Session

---

## 📦 Installation & Setup

Follow these steps to run the project locally on your machine:

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_GITHUB_USERNAME/CodeAlpha_Ecommerce_Store.git](https://github.com/YOUR_GITHUB_USERNAME/CodeAlpha_Ecommerce_Store.git)
cd CodeAlpha_Ecommerce_Store

2.Install Dependencies: Install the required npm packages by running npm install.

3.Environment Configuration: Create a .env file in the root directory containing your environment variables (PORT=3000, MONGODB_URI=your_mongodb_connection_string, and SESSION_SECRET=your_canvas_session_secret_key).

4. Run the Application: Start the development server using npm start and open your browser to `
