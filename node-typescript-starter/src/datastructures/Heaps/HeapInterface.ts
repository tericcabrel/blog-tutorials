export type HeapInterface = {
  poll: () => number;
  insert: (a: number) => void;
};
