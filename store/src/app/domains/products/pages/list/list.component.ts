import { Component, inject, signal } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { type Product } from '@app/types/Products';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
})
export class ListComponent {
  private cartService = inject(CartService);
  private productsService = inject(ProductService);
  products = signal<Product[]>([]);
  // private safeUrl(s: string) {
  //   s = s.replaceAll('["', '');
  //   s = s.replaceAll('"]', '');
  //   return s;
  // }
  ngOnInit() {
    this.productsService.getProducts().subscribe({
      next: (products) => this.products.set(products),
    });
  }
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
