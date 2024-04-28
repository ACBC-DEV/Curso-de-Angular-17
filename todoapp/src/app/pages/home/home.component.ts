
import {
  Component,
  computed,
  signal,
  effect,
  inject,
  Injector,
} from '@angular/core';
import { Task, type Tfilter } from '../../types/taks.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Task[]>([]);
  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });
  // updateTaskCtrl = new FormControl('', {
  //   nonNullable: true,
  //   validators: [Validators.required, Validators.minLength(3)],
  // });
  filter = signal<Tfilter>('all');
  taskByFilter = computed(() => {
    const filter = this.filter();
    if (filter === 'pending') {
      return this.tasks().filter((task) => !task.completed);
    }

    if (filter === 'completed') {
      return this.tasks().filter((task) => task.completed);
    }
    return this.tasks();
  });

  injector = inject(Injector);

  ngOnInit() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) this.tasks.set(JSON.parse(tasks));
    this.trackTasks();
  }
  trackTasks() {
    effect(
      () => {
        const tasks = this.tasks();
        localStorage.setItem('tasks', JSON.stringify(tasks));
      },
      { injector: this.injector }
    );
  }
  changeHandler() {
    if (this.newTaskCtrl.invalid || this.newTaskCtrl.value.trim() === '') {
      return;
    }
    const value = this.newTaskCtrl.value;
    this.addTask(value.trim());
    this.newTaskCtrl.reset();
  }
  editHandler(index: number, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (this.tasks()[index].completed || value.trim() === '') {
      return;
    }
    // const value = this.updateTaskCtrl.value;
    this.updateTask(index, value.trim());
    // this.updateTask(value.trim());
  }
  addTask(title: string) {
    const newTask = {
      // crea un id unico con bycript .uuid()
      id: crypto.randomUUID(),
      title,
      completed: false,
      editing: false,
    };

    this.tasks.update((tasks) => [newTask, ...tasks]);
  }
  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((_, i) => i !== index));
  }
  toggleCheck(id: string) {
    this.tasks.update((tasks: Task[]) => {
      return tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      });
    });
  }
  clearCompleted() {
    return this.tasks.update((tasks) =>
      tasks.filter((task) => !task.completed)
    );
  }
  editTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            editing: !task.editing,
          };
        }
        return {
          ...task,
          editing: false,
        };
      });
    });
  }

  updateTask(index: number, title: string) {
    this.tasks.update((tasks) => {
      return tasks.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            title,
            editing: false,
          };
        }
        return task;
      });
    });
  }

  changeFilter(filter: Tfilter) {
    this.filter.set(filter);
  }
}
