import {
  Component,
  inject,
  computed,
  ViewEncapsulation,
  Injector,
  effect,
} from '@angular/core';
import { Task, type Tfilter } from '@app/types/taks.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodosService } from '@app/service/todos.service';
import { TodoComponent } from '@app/components/todo/todo.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, TodoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class HomeComponent {
  tasks = inject(TodosService);
  todoFilter = computed(() => this.tasks.filters());
  taskFilter = computed(() => {
    const filter = this.tasks.filters();
    if (filter === 'pending') {
      return this.tasks.todos().filter((task) => !task.completed);
    }

    if (filter === 'completed') {
      return this.tasks.todos().filter((task) => task.completed);
    }
    return this.tasks.todos();
  });
  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });

  changeHandler() {
    if (this.newTaskCtrl.invalid || this.newTaskCtrl.value.trim() === '') {
      return;
    }
    const value = this.newTaskCtrl.value;
    this.addTask(value.trim());
    this.newTaskCtrl.reset();
  }
  injector = inject(Injector);

  ngOnInit() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) this.tasks.todos.set(JSON.parse(tasks));
    this.trackTasks();
  }
  trackTasks() {
    effect(
      () => {
        const tasks = this.tasks.todos();
        localStorage.setItem('tasks', JSON.stringify(tasks));
      },
      { injector: this.injector }
    );
  }
  addTask(title: Task['title']) {
    const newTask = {
      // crea un id unico con bycript .uuid()
      id: crypto.randomUUID(),
      title,
      completed: false,
      editing: false,
    };
    this.tasks.addTodo(newTask);
  }

  clearCompleted() {
    return this.tasks.clearCompleted();
  }

  changeFilter(filter: Tfilter) {
    this.tasks.filters.set(filter);
  }
}
