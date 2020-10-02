import { IQueue } from "./queue.interface";

/**
 * Provides a FIFO Queue implementation which provides operations of
 * the following algorithmic complexity:
 * 
 * Access:    O(1)
 * Search:    O(n)
 * Insertion: O(1)
 * Deletion:  O(1)
 * 
 * This is a minimal implementation that follows a similar design
 * principal to that of PubSub queues such as Kafka.
 */
export class Queue<T> implements IQueue<T> {
    private readonly queueMap = new Map<number, T>();
    private startIndex = 0;
    private endIndex = 0;

    public constructor(...elements: T[]) {
        this.enqueue(...elements);
    }

    /**
     * Adds the provided elements to the queue in the order of the array
     * 
     * @param elements: the elements to add to the queue
     */
    enqueue(...elements: T[]): void {
        for (let i = 0; i < elements.length; i++) {
            this.queueMap.set(this.endIndex++, elements[i]);
        }
    }

    /**
     * Removes the first item in the queue
     */
    dequeue(): T | undefined {
        let value = undefined;
        if (this.startIndex < this.endIndex) {
            value = this.queueMap.get(this.startIndex);
            this.queueMap.delete(this.startIndex++);
        }
        return value;
    }

    /**
     * Returns the number of elements in the queue
     */
    public get size() {
        return this.queueMap.size;
    }

    /**
     * Using the iterator implementation to avoid mutation of the queue,
     * joins all stored values in their toString methods
     */
    toString(): string {
        return [...this].toString();
    }

    /**
     * Using the iterator implementation to avoid mutation of the queue,
     * joins all stored values in their toLocalString methods
     */
    toLocaleString(): string {
        return [...this].toLocaleString();
    }

    /**
     * Implements the iterator without any destruction of the internal queue,
     * instead this creates a shallow copy of the values stored in the queue
     * which can be iterated separately.
     */
    [Symbol.iterator](): Iterator<T> {
        const values: T[] = [];
        for (let si = this.startIndex; si < this.endIndex; si++) {
            values.push(this.queueMap.get(si)!);
        }

        let index = 0;
        return {
            next: (): IteratorResult<T> => {
                if (index < values.length) {
                    return { value: values[index++], done: false };
                } else {
                    return { value: null, done: true };
                }
            }
        }
    }
}