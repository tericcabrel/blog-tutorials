import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { Product } from "../services/products/product.model";
import { User } from "../services/users/user.model";

dotenv.config();

const productData = [
  {
    "reference": "TV001",
    "name": "Samsung 4K Smart TV",
    "inStock": 10
  },
  {
    "reference": "TV002",
    "name": "LG OLED TV",
    "inStock": 29
  },
  {
    "reference": "TV003",
    "name": "Sony Bravia LED TV",
    "inStock": 5
  },
  {
    "reference": "TV004",
    "name": "Toshiba Fire TV Edition",
    "inStock": 7
  },
  {
    "reference": "TV005",
    "name": "Panasonic 4K Ultra HD TV",
    "inStock": 10
  },
  {
    "reference": "TV006",
    "name": "VIZIO Quantum Smart TV",
    "inStock": 0
  },
  {
    "reference": "TV007",
    "name": "Hisense Roku TV",
    "inStock": 11
  },
  {
    "reference": "TV008",
    "name": "Philips Ambilight TV",
    "inStock": 9
  },
  {
    "reference": "TV009",
    "name": "Sharp Aquos LED TV",
    "inStock": 22
  },
  {
    "reference": "TV010",
    "name": "Insignia Fire TV Edition",
    "inStock": 0
  }
];
const usersData = [
  {
    "email": "john.smith@email.com",
    "name": "John Smith",
    "password": "e10adc3949ba59abbe56e057f20f883e"
  },
  {
    "email": "jane.doe@email.com",
    "name": "Jane Doe",
    "password": "7d793037a0760186574b0282f2f435e7"
  },
  {
    "email": "michael.johnson@email.com",
    "name": "Michael Johnson",
    "password": "098f6bcd4621d373cade4e832627b4f6"
  }
];

(async () => {
  const databaseConnection = await mongoose.connect(process.env.DATABASE_URL, {
    // and tell the MongoDB driver to not wait more than 5 seconds before erroring out if it isn't connected
    serverSelectionTimeoutMS: 5000
  });

  try {
    await Product.create(productData);
    await User.create(usersData);
  } catch (e) {
    console.error(e);
  } finally {
    await databaseConnection.disconnect();
  }
})();
