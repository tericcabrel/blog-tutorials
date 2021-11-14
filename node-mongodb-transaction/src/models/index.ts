import { Document, Model } from "mongoose";

import { Order } from "./order.model";
import { Product } from "./product.model";
import { User } from "./user.model";

export const models: Model<Document>[] = [
  User,
  Product,
  Order,
];