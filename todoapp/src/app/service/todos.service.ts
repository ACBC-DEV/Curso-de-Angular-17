import { Injectable, computed, signal } from '@angular/core';
import { Task, Tfilter } from '@app/types/taks.model';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos = signal<Task[]>([]);
  filters = signal<Tfilter>('all');
  taskFilter = computed(() => {
    const filter = this.filters();
    if (filter === 'pending') {
      return this.todos().filter((task) => !task.completed);
    }

    if (filter === 'completed') {
      return this.todos().filter((task) => task.completed);
    }
    return this.todos();
  });
  constructor() {}
  addTodo(task: Task) {
    this.todos.update((prev) => [task, ...prev]);
  }

  deleteTodo(id: Task['id']) {
    this.todos.update((prev) => prev.filter((task) => task.id !== id));
  }
  toggleTodo(id: Task['id']) {
    this.todos.update((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }
  clearCompleted() {
    return this.todos.update((tasks) =>
      tasks.filter((task) => !task.completed)
    );
  }
  editTodo(id: string) {
    this.todos.update((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, editing: !task.editing } : task
      )
    );
  }
  updateTodo(id: string, title: string) {
    this.todos.update((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title, editing: false } : task
      )
    );
  }
}
