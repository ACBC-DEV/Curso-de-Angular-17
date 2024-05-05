import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '@app/types/Products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  constructor() {}
  ngOnInit() {}
  getProducts(category_id?: string) {
    const url = new URL('https://api.escuelajs.co/api/v1/products');
    if (category_id) {
      url.searchParams.append('categoryId', category_id);
    }
    return this.http.get<Product[]>(url.toString());
  }
  getOne(id: string) {
    return this.http.get<Product>(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
  }
}
