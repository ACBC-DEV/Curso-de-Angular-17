import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  welcom = 'Welcome todoApp';
  name = signal('ACBC');
  tasks = signal(['First task', 'Second task', 'Third task']);

  disable = true;

  img = 'https://angular.io/assets/images/logos/angular/angular.png';
  person = signal({
    name: 'Raul',
    age: 10,
    job: 'Developer',
  });

  clickHandler() {
    alert('Button clicked!');
  }
  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }
  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log('Key down!', input.value);
  }

  changeAge() {
    this.person.update((prev) => ({ ...prev, age: prev.age + 1 }));
  }
  color = signal('#dddddd');
  colorCtrl = new FormControl();
  widthCtrl = new FormControl(100, {
    nonNullable: true,
  });
  nameCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });
  constructor() {
    this.colorCtrl.valueChanges.subscribe((value) => {
      console.log('Color changed', value);
      this.color.set(`background:${value}`);
    });
  }
}
