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
  const length = parseInt(process.env.MAX_NUMBER ?? '25', 10);

  return fibonacci(length);
};
