import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  cartDetails: ICart = {} as ICart;

  ngOnInit(): void {
    this.getCartData();
  }
  getCartData(): void {
    this.cartService.getLLoggedUserCart().subscribe({
      next: (res) => { this.cartDetails = res.data; },
      error: (err) => { console.error(err); }
    });
  }
  removeItem(id: string): void {
    this.cartService.RemoveSpecificCartItem(id).subscribe({
      next: (res) => { this.cartDetails = res.data; },
      error: (err) => { console.error(err); }
    });
  }
  updateItem(id: string, count: number): void {
    this.cartService.updateCartProductQuantity(id, count).subscribe({
      next: (res) => { this.cartDetails = res.data; },
      error: (err) => { console.error(err); }
    });
  }
  clearCart(): void {
    this.cartService.clearUserCart().subscribe({
      next: (res) => { if (res.message === 'success') { this.cartDetails = {} as ICart; } },
      error: (err) => { console.error(err); }
    });
  }
}
