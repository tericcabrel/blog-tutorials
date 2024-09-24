type OrderCreatedEvent = {
  type: 'order.created';
  payload: {
    orderId: string;
  };
}

type OrderShippedEvent = {
  type: 'order.shipped';
  payload: {
    orderId: string;
    shippingId: string;
  };
}

type OrderCancelledEvent = {
  type: 'order.cancelled';
  payload: {
    orderId: string;
    reason: string;
  };
}

export type OrderEvent = OrderCreatedEvent | OrderShippedEvent | OrderCancelledEvent;

const orderCreateEvent: OrderEvent = {
  type: 'order.created',
  payload: {
    orderId: '123',
  }
}

const orderShippedEvent: OrderEvent = {
  type: 'order.shipped',
  payload: {
    orderId: '123',
    shippingId: 'abc',
  }
}