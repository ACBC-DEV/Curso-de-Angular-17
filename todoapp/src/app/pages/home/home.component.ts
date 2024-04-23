import { CommonModule, NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Task } from '../../types/taks.model';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: crypto.randomUUID(),
      title: 'Task 1',
      completed: false,
    },
    {
      id: crypto.randomUUID(),
      title: 'Task 2',
      completed: false,
    },
    {
      id: crypto.randomUUID(),
      title: 'Task 3',
      completed: true,
    },
    {
      id: crypto.randomUUID(),
      title: 'Task 4',
      completed: false,
    },
    {
      id: crypto.randomUUID(),
      title: 'Task 5',
      completed: false,
    },
  ]);
  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    this.addTask(input.value);
    input.value = '';
  }
  addTask(title: string) {
    const newTask = {
      // crea un id unico con bycript .uuid()
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    this.tasks.update((tasks) => [newTask, ...tasks]);
  }
  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((_, i) => i !== index));
  }
  toggleCheck(index: number) {
    this.tasks.update((tasks: Task[]) => {
      return tasks.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      });
    });
  }
  itemsLeft() {
    return this.tasks().filter((task) => !task.completed).length;
  }
}
