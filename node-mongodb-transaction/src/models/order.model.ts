import mongoose, { Document, Model, Schema } from 'mongoose';

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
  vat: number;
  user: Schema.Types.ObjectId;
  payment: {
    reference: string;
    status: PaymentStatusEnum;
    amount: number;
  },
  items: Array<{
    product: string;
    quantity: number;
    priceUnit: number;
  }>
};

type OrderInput = {
  reference: OrderDocument['reference'];
  status: OrderDocument['status'];
  amount: OrderDocument['amount'];
  vat: OrderDocument['vat'];
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
  priceUnit: {
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
  vat: {
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

const Order: Model<OrderDocument> = mongoose.model('Order', orderSchema);

export { Order, OrderDocument, OrderInput, OrderStatusEnum, PaymentStatusEnum };