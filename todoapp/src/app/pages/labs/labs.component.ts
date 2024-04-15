import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [NgFor],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  title = 'todoapp';
  welcom = 'Welcome todoApp';
  tasks = ['First task', 'Second task', 'Third task'];
}
