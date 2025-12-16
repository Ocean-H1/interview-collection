/**
 * @Description: 实现一个`AsyncTaskQueue`, 用于管理异步任务的执行，并指定最大并发限制。队列应按照任务添加顺序（先进先出，FIFO）执行任务，并确保同时运行的任务数量不超过指定数量。如果某个任务的 Promise 被拒绝，则应静默忽略该拒绝，允许队列继续处理剩余任务。
 * @Author: oceanhhan
 * @Date: 2025-12-16 21:34:10
 */

class AsyncTaskQueue {
  private concurrency: number;
  private runningCount: number = 0;
  private taskQueue: Array<() => Promise<any>> = [];
  constructor(concurrency: number) {
    // Initialize the queue with the specified concurrency limit
    this.concurrency = concurrency;
  }
  queue(task: () => Promise<any>): void {
    // Add an async task to the queue
    this.taskQueue.push(task);
    this.runNext();
  }
  private runNext(): void {
    // Run the next task in the queue if concurrency limit allows
    while (this.runningCount < this.concurrency && this.taskQueue.length > 0) {
      const task = this.taskQueue.shift()!;
      this.runningCount++;
      task()
        .then((res) => {
          // Task completed successfully
          console.log(res);
        })
        .catch((err) => {
          // Silently ignore rejected promises
          console.error(err);
        })
        .finally(() => {
          this.runningCount--;
          this.runNext();
        });
    }
  }
}

// Example usage:
const taskQueue = new AsyncTaskQueue(2); // 最大并发数为2

const task1 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Task 1 done"), 1000));
const task2 = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => reject("Task 2 failed"), 500)
  );
const task3 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Task 3 done"), 200));
const task4 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Task 4 done"), 300));
const task5 = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => reject("Task 5 failed"), 400)
  );
const task6 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Task 6 done"), 600));

taskQueue.queue(task1);
taskQueue.queue(task2);
taskQueue.queue(task3);
taskQueue.queue(task4);
taskQueue.queue(task5);
taskQueue.queue(task6);
