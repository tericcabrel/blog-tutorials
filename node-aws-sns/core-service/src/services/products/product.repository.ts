import { Product } from "./product.model";

export const areProductExist = async (ids: string[]) => {
  const products = await Product.find({ _id: { $in: ids } });

  return products.length === ids.length;
}