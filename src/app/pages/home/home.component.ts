import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';


@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink, SearchPipe, FormsModule, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);
  term: WritableSignal<string> = signal("");
  isWishlisted: { [key: string]: boolean } = {};
  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    rtl: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    rtl: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
  products: WritableSignal<IProduct[]> = signal([]);
  categories: WritableSignal<ICategory[]> = signal([]);
  ngOnInit(): void { this.getProductsData(); this.getCategoriesData(); this.getWishlistData(); }
  getProductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => { this.products.set(res.data); }
    })
  }
  getCategoriesData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => { this.categories.set(res.data); }
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
