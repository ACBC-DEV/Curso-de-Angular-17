import { Routes } from '@angular/router';

import { LayoutComponent } from '@domains/shared/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('@products/pages/list/list.component'),
      },
      {
        path: 'about',
        loadComponent: () => import('@info/pages/about/about.component'),
      },
      {
        path: 'product/:id',
        loadComponent: () =>
          import('@products/pages/product-detail/product-detail.component'),
      },
    ],
  },

  {
    path: '**',
    loadComponent: () => import('@info/pages/not-found/not-found.component'),
  },
];
