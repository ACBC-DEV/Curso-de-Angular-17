import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  UpperCasePipe,
} from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { TimeAgoPipe } from '@app/domains/shared/pipes/time-ago.pipe';

import { Product } from '@app/types/Products';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    UpperCasePipe,
    CurrencyPipe,
    DatePipe,
    TimeAgoPipe,
    RouterLinkWithHref,
  ],
  templateUrl: './product.component.html',
})
export class ProductComponent {
  @Input({ required: true }) product!: Product;
  @Output() addToCart = new EventEmitter();
  addToCartHandler() {
    this.addToCart.emit(this.product);
  }
}
