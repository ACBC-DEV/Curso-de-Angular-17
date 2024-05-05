import { CurrencyPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { CartService } from '@app/domains/shared/services/cart.service';
import { ProductService } from '@app/domains/shared/services/product.service';
import safeUrl from '@app/funtions/safeUrl';
import { Product } from '@app/types/Products';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe, UpperCasePipe],
  templateUrl: './product-detail.component.html',
  styles: ``,
})
export default class ProductDetailComponent {
  @Input() id?: string;
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  productDetail = signal<Product | null>(null);
  cover = signal<string>('');
  ngOnInit() {
    if (!this.id) return;
    this.productService.getOne(this.id).subscribe({
      next: (product) => {
        product = {
          ...product,
          images: product.images.map(safeUrl),
        };
        this.productDetail.set(product);
        if (product.images.length > 0) this.cover.set(product.images[0]);
      },
    });
  }
  addToCart() {
    const product = this.productDetail();
    if (!product) return;
    this.cartService.addToCart(product);
  }
  changeCover(image: string) {
    this.cover.set(image);
  }
}
