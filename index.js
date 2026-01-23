import express from "express";
import dotenv from "dotenv";
import userRouters from "./routes/user.router.js";
import productRouters from "./routes/product.router.js";
import orderRouters from "./routes/order.router.js";
import cartRouters from "./routes/cart.router.js";
import authRouters from "./routes/auth.router.js";
import { connectDB } from "./Config/database.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Backend is Running!");
});

// Connect to MongoDB
connectDB();

app.use("/api/user", userRouters);
app.use("/api/product", productRouters);
app.use("/api/order", orderRouters);
app.use("/api/cart", cartRouters);
app.use("/api/auth", authRouters);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running in http://localhost:${port}`);
});
