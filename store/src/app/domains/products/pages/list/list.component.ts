import { Component, Input, inject, input, signal } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { type Product } from '@app/types/Products';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import safeUrl from '@app/funtions/safeUrl';
import { CategoryService } from '@app/domains/shared/services/category.service';
import { TCategory } from '@app/types/Categories';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
})
export default class ListComponent {
  // @Input() c?: string;
  c = input<string>();
  private cartService = inject(CartService);
  private productsService = inject(ProductService);
  private categoriesService = inject(CategoryService);
  products = signal<Product[]>([]);
  categories = signal<TCategory[]>([]);
  ngOnInit() {
    // this.getProducts();
    this.getCategories();
  }
  ngOnChanges() {
    this.getProducts();
  }
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
  getProducts() {
    this.productsService.getProducts(this.c()).subscribe({
      next: (products) => {
        products = products.map((product) => {
          return {
            ...product,
            images: product.images.map(safeUrl),
          };
        });
        this.products.set(products);
      },
    });
  }
  getCategories() {
    this.categoriesService.getAll().subscribe({
      next: (categories) => {
        this.categories.set(categories);
      },
    });
  }
}
