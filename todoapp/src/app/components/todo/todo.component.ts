import { Component, inject, input, Input } from '@angular/core';
import { Task } from '../../types/taks.model';
import { TodosService } from '@app/service/todos.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [],
  templateUrl: './todo.component.html',
  styles: ``,
})
export class TodoComponent {
  task = input.required<Task>();
  @Input({ required: true }) index: number = 0;
  private tasks = inject(TodosService);

  editTask(id: Task['id']) {
    this.tasks.editTodo(id);
  }
  toggleCheck(id: Task['id']) {
    this.tasks.toggleTodo(id);
  }
  deleteTask(id: Task['id']) {
    this.tasks.deleteTodo(id);
  }
  editHandler(index: number, id: string, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (this.tasks.todos()[index].completed || value.trim() === '') {
      return;
    }
    this.updateTask(id, value.trim());
  }
  updateTask(id: Task['id'], title: string) {
    this.tasks.updateTodo(id, title);
  }
}
