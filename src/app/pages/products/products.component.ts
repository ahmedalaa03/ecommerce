import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { ProductsService } from '../../core/services/products/products.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';

@Component({
  selector: 'app-products',
  imports: [RouterLink, SearchPipe, FormsModule, CurrencyPipe,TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);
  term: WritableSignal<string> = signal("");
  isWishlisted: { [key: string]: boolean } = {};
  products: WritableSignal<IProduct[]> = signal([]);
  ngOnInit(): void { this.getProductsData(); this.getWishlistData(); }
  getProductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => { this.products.set(res.data); }
    })
  }
  addCartItem(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => { this.toastrService.success(res.message, 'FreshCart'); this.cartService.cartNumber.set(res.numOfCartItems) }
    });
  }
  addWishlistItem(id: string): void {
    this.isWishlisted[id] = true;
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => { this.toastrService.success(res.message, 'FreshCart'); }
    })
  }
  removeWishlistItem(id: string): void {
    this.isWishlisted[id] = false;
    this.wishlistService.RemoveProductFromWishlist(id).subscribe({
      next: (res) => { this.toastrService.success(res.message, 'FreshCart'); }
    })
  }
  getWishlistData(): void {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        if (res.data) {
          this.isWishlisted = {};
          res.data.forEach((item: any) => {
            if (item.id) { this.isWishlisted[item.id] = true; }
            else if (item.product && item.product.id) { this.isWishlisted[item.product.id] = true; }
          });
        }
      }
    });
  }
}
