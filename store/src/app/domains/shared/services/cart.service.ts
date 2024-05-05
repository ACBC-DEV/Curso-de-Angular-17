import { Injectable, computed, signal } from '@angular/core';
import { Product } from '@app/types/Products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<Product[]>([]);
  total = computed(() => {
    return this.cart().reduce(
      (acc, product) => acc + product.price * (product.quantity ?? 1),
      0
    );
  });

  constructor() {}

  addToCart(product: Product) {
    if (this.cart().some((item) => item.id === product.id)) {
      const quantityPrev = this.cart().find(
        (item) => item.id === product.id
      )?.quantity;
      product.quantity = (quantityPrev || 0) + 1;
      this.cart.update((prev) =>
        prev.map((item) => (item.id === product.id ? product : item))
      );
      return;
    }
    product.quantity = 1;
    this.cart.update((prev) => [...prev, product]);
  }
}
