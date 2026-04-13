import express, { response } from 'express';
import dotenv from 'dotenv';
import connectDb from './utils/db.js';
import cloudinary from 'cloudinary';
import cors from 'cors';
import helmet from 'helmet';
import axios from 'axios';

dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET
});

const app = express();

const url = `https://ecommerce-2026-server.onrender.com`;
const interval = 30000;

function reloadWebsite() {
  axios.get(url).then((response) => {
    console.log("website reloaded");
  }).catch((error) => {
    console.error(`Error : ${error.message}`);
  });
}

setInterval(reloadWebsite, interval);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "https://js.stripe.com",
        "https://m.stripe.network",
        "https://checkout.stripe.com"
      ],
      frameSrc: [
        "'self'",
        "https://js.stripe.com",
        "https://checkout.stripe.com"
      ],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      connectSrc: [
        "'self'",
        "https://api.stripe.com",
        "https://m.stripe.network"
      ],
    },
  })
);


const port = process.env.PORT

import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import addressRoutes from "./routes/address.js";
import orderRoutes from "./routes/order.js";

app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
    connectDb();
});