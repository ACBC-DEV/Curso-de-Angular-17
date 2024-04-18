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
  welcom = 'Welcome todoApp';
  name = 'RAUL';
  tasks = ['First task', 'Second task', 'Third task'];

  disable = true;

  img = 'https://angular.io/assets/images/logos/angular/angular.png';
  person = {
    name: 'Raul',
    age: 22,
    job: 'Developer',
  };
}
