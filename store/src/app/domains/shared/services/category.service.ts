import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { type TCategory } from '@app/types/Categories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<TCategory[]>(
      'https://api.escuelajs.co/api/v1/categories'
    );
  }

  constructor() {}
}
