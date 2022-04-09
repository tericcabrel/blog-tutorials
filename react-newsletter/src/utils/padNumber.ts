export const padNumber = (value: number) => {
  if (value < 10) {
    return `0${value}`;
  }

  return value.toString();
};
