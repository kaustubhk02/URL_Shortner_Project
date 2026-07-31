# URL Shortener

A full-stack URL Shortener web application built with **Node.js**, **Express**, **MongoDB (Mongoose)**, and **EJS** templating engine. Features user authentication with JWT, role-based access control (`NORMAL`, `ADMIN`), and click analytics for shortened links.

---

## 🚀 Features

- **URL Shortening**: Generates unique short IDs using `nanoid` for long URLs.
- **Redirection & Analytics**: Tracks total clicks and detailed visit history (timestamps) for each URL.
- **User Authentication**: User Signup & Login system secured with **JWT (JSON Web Tokens)**.
- **Role-Based Access Control**: Restricts URL creation and access based on user roles (`NORMAL`, `ADMIN`).
- **Server-Side Rendering**: Clean dynamic UI built using **EJS** templates (`home`, `login`, `signup`).

---

## 🛠️ Prerequisites

- **Node.js** (v18 or higher recommended)
- **MongoDB** running locally at `mongodb://127.0.0.1:27017`

---

## 📦 Installation & Setup

1. **Navigate to the project folder:**
   ```bash
   cd Project-2_urlShortner
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Ensure MongoDB is running:**
   Make sure your MongoDB server is active locally on `mongodb://127.0.0.1:27017`.

4. **Start the server:**
   - **Production mode:**
     ```bash
     npm start
     ```
   - **Development mode (with nodemon):**
     ```bash
     npm run dev
     ```

5. **Open in Browser:**
   Visit `http://localhost:1500` in your web browser.

---

## 📝 Project Structure

```text
├── app.js               # Main application entry point & Express server setup
├── connectDB.js         # Database connection logic
├── controllers/         # Business logic for URLs and user actions
├── middlewares/         # Authentication & role-based middleware
├── models/              # Mongoose database schemas (URL, User)
├── routes/              # Route definitions (static views, URL API, User auth)
├── services/            # JWT authentication services
├── views/               # EJS template engine files (home, login, signup)
└── package.json         # NPM package dependencies and configuration
```