import { Component } from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './layout.component.html',
  styles: ``,
})
export class LayoutComponent {}
