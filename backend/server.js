import express from "express";
import products from "./data/products";

import { config } from "./constants";
const app = express();

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);

  if (!product) {
    res.json({ message: "Product Not Found" });
  }

  res.json(product);
});

app.listen(config.PORT, (err) => {
  if (err) {
    console.log("Cannot Running");
    console.log("==============================");
    console.log(err);
    console.log("==============================");
  } else {
    console.log(`
      -----
      Server Running on PORT: ${config.PORT}
      -----
      On mode envirenmont: ${config.MODE_ENV}
      -----
    `);
  }
});
