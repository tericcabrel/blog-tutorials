import mongoose, { Document, Model, Schema } from 'mongoose';

type ProductDocument = Document & {
  name: string;
  reference: string;
  inStock: number;
};

type ProductInput = {
  name: ProductDocument['name'];
  reference: ProductDocument['reference'];
  inStock: ProductDocument['inStock'];
};

const productSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  reference: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  inStock: {
    type: Schema.Types.Number,
    default: 0,
  }
}, {
  collection: "products",
  timestamps: true,
});

const Product: Model<ProductDocument> = mongoose.model<ProductDocument>('Product', productSchema);

export { Product, ProductDocument, ProductInput, productSchema };