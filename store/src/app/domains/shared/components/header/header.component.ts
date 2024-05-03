import { Component, inject, signal } from '@angular/core';

import { CartService } from '../../services/cart.service';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private cartService = inject(CartService);

  hideSideMenu = signal(true);

  // total = signal(0);
  cart = this.cartService.cart;
  total = this.cartService.total;
  toggleSideMenu() {
    this.hideSideMenu.set(!this.hideSideMenu());
  }
}
