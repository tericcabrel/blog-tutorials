import Heap from './Heap';
import { HeapInterface } from './HeapInterface';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export default class MaxHeap extends Heap implements HeapInterface {
  constructor() {
    super();
  }

  public poll(): number | never {
    if (this.array.length > 0) {
      const start = 0;
      const item = this.array[start];
      const lastElement = this.array.pop()!;

      this.array[0] = lastElement;
      this.heapifyDown();
      return item;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw 'Error polling';
    }
  }

  public insert(a: number): void {
    this.array.push(a);
    this.heapifyUp();
  }

  private heapifyUp(): void {
    let index = this.array.length - 1;

    while (this.hasParent(index) && this.parent(index) < this.array[index]) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  private heapifyDown(): void {
    let index = 0;

    while (this.hasLeftChild(index)) {
      let largerChildIndex = this.getLeftChildIndex(index);

      if (this.hasRightChild(index) && this.rightChild(index) > this.leftChild(index)) {
        largerChildIndex = this.getRightChildIndex(index);
      }
      if (this.array[index] > this.array[largerChildIndex]) {
        break;
      } else {
        this.swap(index, largerChildIndex);
        index = largerChildIndex;
      }
    }
  }
}
