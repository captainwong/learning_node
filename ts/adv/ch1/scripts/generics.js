"use strict";
class Queue {
    constructor() {
        this.queue = [];
    }
    Push(value) {
        this.queue.push(value);
    }
    Pop() {
        return this.queue.shift();
    }
}
console.log(`calling generic queue`);
const queue = new Queue();
const stringQueue = new Queue();
queue.Push(10);
queue.Push(35);
console.log(queue.Pop());
console.log(queue.Pop());
stringQueue.Push(`Hello`);
stringQueue.Push(`Generics`);
console.log(stringQueue.Pop());
console.log(stringQueue.Pop());
