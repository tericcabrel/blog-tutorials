import mongoose, { Document, Schema } from 'mongoose';
import {productSchema} from "../products/product.model";

enum OrderStatusEnum {
  CREATED = 'created',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  CANCELLED = 'cancelled',
}

enum PaymentStatusEnum {
  CREATED = 'created',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

type OrderDocument = Document & {
  reference: string;
  status: OrderStatusEnum;
  amount: number;
  vatRate: number;
  user: mongoose.Types.ObjectId;
  payment: {
    reference: string;
    status: PaymentStatusEnum;
    amount: number;
  },
  items: Array<{
    product: mongoose.Types.ObjectId;
    quantity: number;
    unitPrice: number;
  }>
};

type OrderInput = {
  reference: OrderDocument['reference'];
  status: OrderDocument['status'];
  amount: OrderDocument['amount'];
  vatRate: OrderDocument['vatRate'];
  user: OrderDocument['user'];
  payment: OrderDocument['payment'];
  items: OrderDocument['items'];
};

const paymentSchema = new Schema({
  reference: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  status: {
    type: Schema.Types.String,
    required: true,
    enum: PaymentStatusEnum,
    default: PaymentStatusEnum.CREATED,
  },
  amount: {
    type: Schema.Types.Number,
    required: true,
  },
}, {
  timestamps: true,
});

const orderItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    index: true,
  },
  quantity: {
    type: Schema.Types.Number,
    required: true,
  },
  unitPrice: {
    type: Schema.Types.Number,
    required: true,
  },
});

const orderSchema = new Schema({
  reference: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  status: {
    type: Schema.Types.String,
    required: true,
    enum: OrderStatusEnum,
    default: OrderStatusEnum.CREATED,
  },
  amount: {
    type: Schema.Types.Number,
    required: true,
  },
  vatRate: {
    type: Schema.Types.Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  payment: {
    type: paymentSchema,
    required: true,
    index: true,
  },
  items: {
    type: [orderItemSchema],
    required: true,
  }
}, {
  collection: "orders",
  timestamps: true,
});

mongoose.model<OrderDocument>('Product', productSchema);
const Order = mongoose.model<OrderDocument>('Order', orderSchema);

export { Order, OrderDocument, OrderInput, OrderStatusEnum, PaymentStatusEnum };