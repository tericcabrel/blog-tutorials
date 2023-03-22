export default class Tree {
  public left: Tree | null;
  public right: Tree | null;
  public value: number;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
