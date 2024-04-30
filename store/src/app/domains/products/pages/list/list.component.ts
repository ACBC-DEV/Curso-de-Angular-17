import { Component, signal } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { type Product } from '@app/types/Products';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  data = signal<Product[]>([]);
  items: any = [];
  fromChild(event: string) {
    console.log('Event from child: Padre', event);
  }
}
