import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IWishlist } from '../../shared/interfaces/iwishlist';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe,TranslatePipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
    private readonly toastrService = inject(ToastrService);
  wishlistDetails:IWishlist[] = [] ;
  ngOnInit(): void {
    this.getWishlistData();
  }
  getWishlistData(): void {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => { this.wishlistDetails = res.data;}});
  }
  removeItem(id: string): void {
    this.wishlistService.RemoveProductFromWishlist(id).subscribe({
      next: (res) => {this.getWishlistData()}
    });
  }
  addCartItem(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => { this.toastrService.success(res.message, 'FreshCart'); this.cartService.cartNumber.set(res.numOfCartItems) }
    });
    this.removeItem(id)
  }
}
