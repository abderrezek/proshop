import colors from "colors";

import dbConfig from "./config/db";

import users from "./data/users";
import products from "./data/products";

import Order from "./models/order";
import Product from "./models/product";
import User from "./models/user";

dbConfig();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Import User
    const usersInserted = await User.insertMany(users);
    const idUserAdmin = usersInserted[0]._id;

    // Import Product
    const sampleProducts = products.map((product) => ({
      ...product,
      user: idUserAdmin,
    }));
    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "--d") {
  destroyData();
} else {
  importData();
}
