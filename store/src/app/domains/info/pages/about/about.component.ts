import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { CounterComponent } from '@domains/shared/components/counter/counter.component';
import { WaveAudioComponent } from '@domains/info/components/wave-audio/wave-audio.component';
import { HighlightDirective } from '@app/domains/shared/directives/highlight.directive';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CounterComponent,
    CommonModule,
    WaveAudioComponent,
    HighlightDirective,
  ],
  templateUrl: './about.component.html',
  styles: ``,
})
export default class AboutComponent {
  duration = signal(1000);
  message = signal('Hello World');
  changeDuration(event: Event) {
    const input = event.target as HTMLInputElement;
    this.duration.set(input.valueAsNumber);
  }

  changeMessage(event: Event) {
    const input = event.target as HTMLInputElement;
    this.message.set(input.value);
  }
}
