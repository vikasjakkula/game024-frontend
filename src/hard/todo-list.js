class Todo {
  constructor() {
    this.tasks = [];
  }

  add(task) {
    this.tasks.push(task);
  }

  getAll() {
    return [...this.tasks];
  }

  remove(index) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks.splice(index, 1);
    }
  }

  update(index, newTask) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks[index] = newTask;
    }
  }

  get(index) {
    if (index >= 0 && index < this.tasks.length) {
      return this.tasks[index];
    }
    return null;
  }

  clear() {
    this.tasks = [];
  }
}

module.exports = Todo; 