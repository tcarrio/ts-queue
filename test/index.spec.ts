import { Queue } from "../src";

describe("Queue tests", () => {
  describe("Queue behavior", () => {
    it("should enqueue an item", () => {
      const queue = new Queue<string>("test");
      expect(queue.dequeue()).toEqual("test");
    })

    it("should dequeue an item", () => {
      const queue = new Queue<string>("test");
      expect(queue.dequeue()).toEqual("test");
    })

    it("should be iterable", () => {
      const queue = new Queue<string>("a", "b", "c");
      const list = [...queue];
      expect(list).toHaveLength(3);
      expect(list).toEqual(["a", "b", "c"]);
    });

    it("should be as a FIFO queue", () => {
      const queue = new Queue<number>(1, 3);
      expect(queue.dequeue()).toEqual(1);
      queue.enqueue(5);
      expect(queue.dequeue()).toEqual(3);
    });
  })

  describe("Size calculation", () => {
    it("should return the correct size when nothing has been dequeued", () => {
      const list = [1,2,3,4,5];
      const queue = new Queue(...list);
      expect(queue.size).toEqual(list.length);
    });

    it("should return the correct size when several items have been dequeued", () => {
      const list = [1,2,3,4,5];
      const length = list.length;
      const queue = new Queue(...list);
      expect(queue.size).toEqual(length);
      queue.dequeue();
      queue.dequeue();
      queue.dequeue();
      expect(queue.size).toEqual(length - 3);
    });

    it("should return the correct size between multiple dequeue calls", () => {
      const list = [1,2,3,4,5];
      let length = list.length;
      const queue = new Queue(...list);
      expect(queue.size).toEqual(length);
      queue.dequeue();
      expect(queue.size).toEqual(--length);
      queue.dequeue();
      queue.dequeue();
      expect(queue.size).toEqual(length -= 2);
    });

    it("should not go negative after removing from an empty queue", () => {
      const queue = new Queue<any>();
      expect(queue.size).toEqual(0);
      queue.dequeue();
      expect(queue.size).toEqual(0);
      queue.dequeue();
      queue.dequeue();
      expect(queue.size).toEqual(0);
    });
  });

  describe("Miscellanious", () => {
    it("should stringify", () => {
      const list = ["a", "b", "c"];
      const queue = new Queue<string>(...list);

      expect(queue.toString()).toEqual(list.toString());
    });

    it("should dequeue an empty queue multiple times without any odd behavior", () => {
      const queue = new Queue();
      queue.dequeue();
      queue.dequeue();
      queue.dequeue();
      queue.enqueue(9);
      expect(queue.dequeue()).toEqual(9);
    });
  })
})