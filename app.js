import express from "express";
import bodyParser from "body-parser";
import mongoose from "./db/dbConfig.js";
import ProductRouter from './route/product.route.js';
import SubscriptionRoute from './route/subscription.route.js';
import OrderRoute from './route/order.route.js';
import LikeRoute from './route/like.route.js';
import CartRoute from './route/cart.route.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use("/product", ProductRouter);

app.use("/order",OrderRoute);

app.use("/like",LikeRoute);

app.use("/subscription",SubscriptionRoute);

app.use("/cart",CartRoute);

app.listen(3010, () => {
    console.log("Server Started...");
})