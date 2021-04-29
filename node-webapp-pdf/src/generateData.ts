import faker from 'faker';
import { sum } from 'lodash';

import { Order, OrderInput, OrderItemInput, OrderStatusEnum, PaymentModeEnum } from './models/order.model';
import { User, UserInput } from './models/user.model';
import { Address, AddressInput } from './models/address.model';

type ItemData = {
  user: UserInput;
  addresses: AddressInput[];
  orders: OrderInput[];
};

type GenerateAddressArgs = {
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
};

const generateOrderStatus = () => {
  return faker.random.arrayElement([OrderStatusEnum.PENDING, OrderStatusEnum.SHIPPING, OrderStatusEnum.DELIVERED, OrderStatusEnum.CANCELLED]);
};

const generatePaymentMode = () => {
  return faker.random.arrayElement([PaymentModeEnum.CARD, PaymentModeEnum.PAYPAL, PaymentModeEnum.BANK_WIRE]);
};

const generateUser = (): UserInput => {
  const gender = Math.random() > 0.5 ? 1 : 0;
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);

  return {
    firstName,
    lastName,
    email: faker.internet.email(firstName, lastName),
    phoneNumber: faker.phone.phoneNumber(),
  };
};

const generateAddress = ({ firstName, lastName, phoneNumber }: GenerateAddressArgs): AddressInput => {
  const gender = Math.random() > 0.5 ? 1 : 0;
  const firstNameGenerated = faker.name.firstName(gender);
  const lastNameGenerated = faker.name.lastName(gender);
  const state = faker.address.state();

  return {
    user: '',
    city: faker.address.city(),
    country: faker.address.country(),
    state,
    street: faker.address.streetName(),
    postalCode: faker.address.zipCodeByState(state),
    lastName: lastName || lastNameGenerated,
    firstName: firstName || firstNameGenerated,
    phoneNumber: phoneNumber || faker.phone.phoneNumber(),
  };
};

const generateOrderItemOptions = (): [string, string][] => {
  const fruit = faker.random.arrayElement(['Guava', 'Orange', 'Lemon', 'Pineapple', 'Pawpaw', 'Mango', 'None']);
  const drink = faker.random.arrayElement(['Coca Cola', 'Fanta', 'Sprite', 'Heineken', 'Beer', 'Guinness', 'None']);

  return [
    ['Fruit', fruit],
    ['Drink', drink],
  ];
};

const generateOrderItems = (count = 1): OrderItemInput[] => {
  return new Array(count).fill(0).map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_v): OrderItemInput => ({
      price: faker.datatype.number({ min: 100, max: 10000 }),
      productName: faker.commerce.productName(),
      productReference: faker.random.alphaNumeric(8).toUpperCase(),
      productPicture: faker.image.food(600, 300),
      quantity: faker.datatype.number({ min: 1, max: 5 }),
      productOptions: generateOrderItemOptions(),
    }),
  );
};

const generateOrder = (): OrderInput => {
  const items = generateOrderItems();
  const subTotal = sum(items.map((item) => item.price * item.quantity));
  const taxAmount = subTotal * 0.2;
  const shippingAmount = faker.datatype.number({ min: 1000, max: 5000 });
  const totalAmount = subTotal + taxAmount + shippingAmount;

  return {
    user: '',
    billingAddress: '',
    shippingAddress: '',
    paymentMode: generatePaymentMode(),
    status: generateOrderStatus(),
    reference: `STORE${new Date().getFullYear()}${faker.datatype.number({ min: 10000, max: 99999 })}`,
    shippingAmount,
    taxAmount,
    totalAmount,
    items,
  };
};

const generateItemData = (): ItemData => {
  const user = generateUser();
  const addressCount = faker.datatype.number({ min: 2, max: 4 });
  const orderCount = faker.datatype.number({ min: 1, max: 3 });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addresses = new Array(addressCount).fill(0).map((_v) => generateAddress(Math.random() > 0.5 ? {} : user));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const orders = new Array(orderCount).fill(0).map((_v) => generateOrder());

  return {
    user,
    addresses,
    orders,
  };
};

export const loadDatabase = async (fakerLocale = 'fr', cleanDb = false) => {
  faker.locale = fakerLocale;

  if (cleanDb) {
    await Order.deleteMany();
    await Address.deleteMany();
    await User.deleteMany();
  }

  for (let i = 0; i < 10; i++) {
    const itemData = generateItemData();

    const [userCreated] = await User.create([itemData.user]);

    const addressInputPromises = itemData.addresses.map((addressInput) => {
      return Address.create([
        {
          ...addressInput,
          user: userCreated._id,
        },
      ]);
    });

    await Promise.allSettled(addressInputPromises);

    const addresses = await Address.find({ user: userCreated._id });
    const addressIds = addresses.map(({ _id }) => _id);

    const orderInputPromises = itemData.orders.map((orderInput) => {
      return Order.create([
        {
          ...orderInput,
          user: userCreated._id,
          shippingAddress: faker.random.arrayElement(addressIds),
          billingAddress: faker.random.arrayElement(addressIds),
        },
      ]);
    });

    await Promise.allSettled(orderInputPromises);
  }
};
