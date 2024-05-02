import { Component, Input, SimpleChanges, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
})
export class CounterComponent {
  @Input({ required: true }) duration: number = 0;
  @Input({ required: true }) message: string = '';
  counter = signal(0);
  counterRef: number | undefined;
  constructor() {
    // NO ASYNC calls here
    // Before Render
    // una vez
    console.log('constructor');
    console.log('-'.repeat(20));
  }
  ngOnChanges(chages: SimpleChanges) {
    // Before and During Render
    console.log('ngOnChanges');
    console.log('-'.repeat(20));
    console.log(chages);
    const duration = chages['duration'];
    if (duration) this.doSomething(duration.currentValue);
  }
  ngOnInit() {
    // After Render
    // una vez
    //async, then , subs
    console.log('ngOnInit');
    console.log('-'.repeat(20));
    console.log('duration =>', this.duration);
    console.log('message =>', this.message);
    this.counterRef = window.setInterval(() => {
      console.log('run interval');
      this.counter.update((value) => value + 1);
    }, 1000);
  }
  ngAfterViewInit() {
    // after render
    // hijos ya renderizados
    console.log('ngAfterViewInit');
    console.log('-'.repeat(20));
  }
  ngOnDestroy() {
    // Before Destroy
    console.log('ngOnDestroy');
    console.log('-'.repeat(20));
    clearInterval(this.counterRef);
  }
  doSomething(value: number) {
    console.log('durations changes');
    console.log('-'.repeat(20));
    this.duration = value;
  }
}
