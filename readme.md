Congratulations on finishing your project! You’ve built a robust, secure, and production-ready backend. Since we’ve covered everything from **JWT authentication** to **populate-based queries**, your README should reflect that technical depth.

Here is a professional, structured `README.md` file tailored to your specific implementation.

---

# 📚 E-Commerce & Bookshop API

A high-performance, secure RESTful API built with **Node.js**, **Express**, and **MongoDB**. This project implements a full e-commerce flow, including user authentication, product management, shopping carts, and order processing with automated price calculations.

## 🚀 Key Features

- **Secure Authentication:** JWT-based login system with password encryption using **Bcrypt**.
- **Role-Based Authorization:** Specific routes restricted to Admin users (e.g., managing all orders).
- **Data Integrity:** Strict schema validation using **Zod** and **Mongoose**.
- **Smart Order System:** Server-side `totalAmount` calculation and price-locking at the time of purchase.
- **Relationship Mapping:** Extensive use of `.populate()` to link Users, Orders, and Products.
- **Advanced Querying:** Built-in support for **filtering**, **searching**, and **pagination**.

---

## 🛠 Tech Stack

| Technology             | Purpose                               |
| ---------------------- | ------------------------------------- |
| **Node.js / Express**  | Runtime Environment & Web Framework   |
| **MongoDB / Mongoose** | Database & Object Data Modeling (ODM) |
| **Zod**                | Schema Validation for Request Bodies  |
| **JWT**                | Secure Token-based Authentication     |
| **Bcrypt**             | Password Hashing & Encryption         |

---

## 📋 API Endpoints

### 🔐 Authentication

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| `POST` | `/api/auth/register` | Register a new user   |
| `POST` | `/api/auth/login`    | Login and receive JWT |

### 📖 Products

| Method | Endpoint            | Description                                  |
| ------ | ------------------- | -------------------------------------------- |
| `GET`  | `/api/products`     | Get all products (with pagination & filters) |
| `GET`  | `/api/products/:id` | Get details of a single product              |
| `POST` | `/api/products`     | Create a new product (Admin Only)            |

### 🛒 Shopping Cart

| Method   | Endpoint        | Description                  |
| -------- | --------------- | ---------------------------- |
| `GET`    | `/api/cart`     | View current user's cart     |
| `POST`   | `/api/cart/add` | Add an item to the cart      |
| `DELETE` | `/api/cart/:id` | Remove an item from the cart |

### 📦 Orders

| Method  | Endpoint                 | Description                                      |
| ------- | ------------------------ | ------------------------------------------------ |
| `POST`  | `/api/orders`            | Place a new order                                |
| `GET`   | `/api/orders/my-orders`  | View logged-in user's order history              |
| `GET`   | `/api/orders/admin/all`  | View all orders across the platform (Admin Only) |
| `PATCH` | `/api/orders/:id/status` | Update order/payment status (Admin Only)         |

---

## 🛡 Data Validation Example (Zod)

The project uses Zod to catch errors before they hit the database. For example, our **Order Validator** ensures that every order has a valid MongoDB ID format and a quantity of at least 1.

```javascript
export const createOrderSchema = z.object({
  items: z
    .array(orderedItemSchema)
    .min(1, "Order must contain at least one item"),
  shippingAddress: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().min(1),
  }),
  paymentMethod: z.enum([
    "credit_card",
    "paypal",
    "cod",
    "stripe",
    "bank_transfer",
  ]),
});
```

---

## ⚙️ Installation & Setup

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/bookshop-api.git
cd bookshop-api

```

2. **Install dependencies:**

```bash
npm install

```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key

```

4. **Run the application:**

```bash
# Development mode
npm run dev

# Production mode
npm start

```

---

## 📈 Query & Pagination Logic

This API supports efficient data fetching using query parameters:

- `GET /api/products?page=1&limit=10`
- `GET /api/products?category=Fiction&sortBy=price:desc`

> **Note:** The `totalAmount` for orders is calculated server-side using the `items.reduce()` method to ensure security against client-side price manipulation.

---
