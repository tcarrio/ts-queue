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
    public enqueue(...elements: T[]): void {
        for (let i = 0; i < elements.length; i++) {
            this.queueMap.set(this.endIndex++, elements[i]);
        }
    }

    /**
     * Removes the first item in the queue
     */
    public dequeue(): T | undefined {
        let value = undefined;
        if (this.size > 0) {
            value = this._peek();
            this._deleteFirst();
        }
        return value;
    }

    /**
     * Deletes the first element from the queue
     */
    private _deleteFirst(): void {
        this.queueMap.delete(this.startIndex++)
    }

    /**
     * Returns the number of elements in the queue
     */
    public get size() {
        return this.queueMap.size;
    }

    /**
     * Returns the value of the first item in the queue without removing it
     * 
     * @returns: the first item in the queue, or null
     */
    public peek(): T | undefined {
        let value = undefined;
        if (this.size > 0) {
            value = this._peek();
        }
        return value;
    }

    /**
     * Unconditionally retrieves the first value stored in the queue
     */
    private _peek(): T | undefined {
        return this.queueMap.get(this.startIndex)
    }

    /**
     * Using the iterator implementation to avoid mutation of the queue,
     * joins all stored values in their toString methods
     */
    public toString(): string {
        return [...this].toString();
    }

    /**
     * Using the iterator implementation to avoid mutation of the queue,
     * joins all stored values in their toLocalString methods
     */
    public toLocaleString(): string {
        return [...this].toLocaleString();
    }

    /**
     * Implements the iterator without any destruction of the internal queue,
     * instead this creates a shallow copy of the values stored in the queue
     * which can be iterated separately.
     */
    public [Symbol.iterator](): Iterator<T> {
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