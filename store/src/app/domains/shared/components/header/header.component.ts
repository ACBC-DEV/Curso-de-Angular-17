import { Component, Input, SimpleChanges, signal } from '@angular/core';
import { Product } from '@app/types/Products';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input({ required: true }) cart: Product[] = [];
  showTotalPrice = signal(false);
  hideSideMenu = signal(true);
  total = signal(0);
  toggleSideMenu() {
    this.hideSideMenu.set(!this.hideSideMenu());
  }
  totalPrice() {
    return this.cart.reduce(
      (acc, product) => acc + product.price * (product.quantity ?? 1),
      0
    );
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['cart']) {
      this.showTotalPrice.set(this.cart.length > 0);
      this.total.set(this.totalPrice());
    }
  }
}
