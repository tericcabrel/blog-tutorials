import MaxHeap from './datastructures/Heaps/MaxHeap';
import MinHeap from './datastructures/Heaps/MinHeap';

const minHeap = new MinHeap();

minHeap.insert(3);
minHeap.insert(4);
minHeap.insert(9);
minHeap.insert(5);
minHeap.insert(2);
minHeap.poll();
minHeap.poll();
minHeap.poll();
minHeap.insert(2);
minHeap.insert(3);

console.log(minHeap);

const maxHeap = new MaxHeap();

maxHeap.insert(3);
maxHeap.insert(4);
maxHeap.insert(9);
maxHeap.insert(5);
maxHeap.insert(2);
maxHeap.poll();
maxHeap.poll();
maxHeap.poll();
maxHeap.insert(9);

console.log(maxHeap);
