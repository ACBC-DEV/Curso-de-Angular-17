import { Component, signal } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { type Product } from '@app/types/Products';
import { HeaderComponent } from '@app/domains/shared/components/header/header.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
})
export class ListComponent {
  products = signal<Product[]>([
    {
      id: 12,
      title: 'Product 1',
      price: 100,
      images: ['https://via.placeholder.com/150'],

      description: 'Description 1',
    },
    {
      id: 15,
      title: 'Product 45',
      price: 100,
      images: ['https://via.placeholder.com/150'],
      description: 'Description 1',
    },
    {
      id: 1871,
      title: 'Product 4',
      price: 100,
      images: ['https://via.placeholder.com/150'],
      description: 'Description 1',
    },
    {
      id: 141,
      title: 'Product 1',
      price: 100,
      images: ['https://via.placeholder.com/150'],

      description: 'Description 1',
    },
    {
      id: 154,
      title: 'Product 45',
      price: 100,
      images: ['https://via.placeholder.com/150'],
      description: 'Description 1',
    },
    {
      id: 1410,
      title: 'Product 4',
      price: 100,
      images: ['https://via.placeholder.com/150'],
      description: 'Description 1',
    },
  ]);
  cart = signal<Product[]>([]);
  items: any = [];

  addToCart(product: Product) {
    if (!this.cart().includes(product)) {
      product.quantity = 1;
      this.cart.update((prev) => [...prev, product]);
      return;
    }
    product.quantity = (product.quantity || 0) + 1;
    this.cart.update((prev) =>
      prev.map((item) => (item.id === product.id ? product : item))
    );
  }
}
