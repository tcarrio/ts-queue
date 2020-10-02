export interface IQueue<T> {
    /**
     * Adds elements to the internal queue
     * 
     * @param elements: the elements to add to the queue
     */
    enqueue(...elements: T[]): void;

    /**
     * Pops the first item from the queue
     * 
     * @returns: the first item in the queue, or null
     */
    dequeue(): T | undefined;

    /**
     * Returns the number of items currently in the queue
     */
    size: number;

    [Symbol.iterator](): Iterator<T>;
}