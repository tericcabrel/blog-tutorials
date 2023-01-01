const fibonacci = (num: number) => {
  if (num === 0) {
    return 0;
  }

  if (num === 1) {
    return 1;
  }

  return fibonacci(num - 1) + fibonacci(num - 2);
};

export const searchProducts = () => {
  const length = 25;

  return fibonacci(length);
};
