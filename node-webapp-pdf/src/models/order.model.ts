import mongoose, { Schema, Document, Model } from 'mongoose';

enum PaymentModeEnum {
  CARD = 'CARD',
  PAYPAL = 'PAYPAL',
  BANK_WIRE = 'BANK_WIRE',
}

enum OrderStatusEnum {
  PENDING = 'PENDING',
  SHIPPING = 'SHIPPING',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

type OrderItemInput = {
  productName: string;
  productReference: string;
  productPicture: string;
  productOptions: [string, string][];
  quantity: number;
  price: number;
};

type OrderDocument = Document & {
  reference: string;
  status: OrderStatusEnum;
  shippingAmount: number;
  taxAmount: number;
  totalAmount: number;
  paymentMode: PaymentModeEnum;
  user: string;
  shippingAddress: string;
  billingAddress: string;
  items: OrderItemInput[];
};

type OrderInput = {
  reference: OrderDocument['reference'];
  status: OrderDocument['status'];
  shippingAmount: OrderDocument['shippingAmount'];
  taxAmount: OrderDocument['taxAmount'];
  totalAmount: OrderDocument['totalAmount'];
  paymentMode: OrderDocument['paymentMode'];
  user: OrderDocument['user'];
  shippingAddress: OrderDocument['shippingAddress'];
  billingAddress: OrderDocument['billingAddress'];
  items: OrderDocument['items'];
};

const orderSchema = new Schema(
  {
    reference: {
      type: Schema.Types.String,
      required: true,
      index: true,
    },
    status: {
      type: Schema.Types.String,
      enum: OrderStatusEnum,
      default: OrderStatusEnum.PENDING,
    },
    shippingAmount: {
      type: Schema.Types.Number,
      required: true,
    },
    taxAmount: {
      type: Schema.Types.Number,
      required: true,
    },
    totalAmount: {
      type: Schema.Types.Number,
      required: true,
    },
    paymentMode: {
      type: Schema.Types.String,
      enum: PaymentModeEnum,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    shippingAddress: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
      required: true,
    },
    billingAddress: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
      required: true,
    },
    items: [
      new Schema({
        productName: {
          type: Schema.Types.String,
          required: true,
        },
        productReference: {
          type: Schema.Types.String,
          required: true,
        },
        productPicture: {
          type: Schema.Types.String,
          required: true,
        },
        productOptions: {
          type: Schema.Types.Array,
          required: true,
        },
        quantity: {
          type: Schema.Types.Number,
          required: true,
        },
        price: {
          type: Schema.Types.Number,
          required: true,
        },
      }),
    ],
  },
  {
    collection: 'store_orders',
    timestamps: true,
    usePushEach: true,
  },
);

const Order: Model<OrderDocument> = mongoose.model('Order', orderSchema);

export { Order, OrderDocument, OrderInput, OrderItemInput, PaymentModeEnum, OrderStatusEnum };
