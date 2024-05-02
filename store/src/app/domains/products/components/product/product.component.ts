import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@app/types/Products';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
})
export class ProductComponent {
  @Input({ required: true }) product!: Product;
  @Output() addToCart = new EventEmitter();
  addToCartHandler() {
    this.addToCart.emit(this.product);
  }
}
