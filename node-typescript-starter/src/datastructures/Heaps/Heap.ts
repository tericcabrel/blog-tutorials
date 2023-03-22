/* eslint-disable @typescript-eslint/no-non-null-assertion */
export default class Heap {
  public array: number[];

  constructor() {
    this.array = [];
  }

  public hasLeftChild(index: number): boolean {
    return this.getLeftChildIndex(index) < this.array.length;
  }

  public hasRightChild(index: number): boolean {
    return this.getRightChildIndex(index) < this.array.length;
  }

  public hasParent(index: number): boolean {
    return this.getParentIndex(index) >= 0;
  }

  public getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1;
  }

  public getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }

  public getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  public leftChild(index: number): number {
    return this.array[this.getLeftChildIndex(index)];
  }

  public rightChild(index: number): number {
    return this.array[this.getRightChildIndex(index)];
  }

  public parent(index: number): number {
    return this.array[this.getParentIndex(index)];
  }

  public peek(): number | never {
    if (this.array.length > 0) {
      return this.array[0];
    } else {
      throw 'Error peeking';
    }
  }

  public swap(indexOne: number, indexTwo: number): void {
    const temp = this.array[indexOne];

    this.array[indexOne] = this.array[indexTwo];
    this.array[indexTwo] = temp;
  }
}
