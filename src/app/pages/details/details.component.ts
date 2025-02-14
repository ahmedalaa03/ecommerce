import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
    private readonly cartService = inject(CartService);
      private readonly toastrService = inject(ToastrService);
  detailsProduct: IProduct | null = null;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        let idProduct = p.get('id');
       this.productsService.getSpecificProduct(idProduct).subscribe({
          next: (res) => { this.detailsProduct = res.data},
          error: (err) => { console.log(err); }
        });
      }
    })
  }
  addCartItem(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => { this.toastrService.success(res.message,'FreshCart') }, error: (err) => { console.log(err) }
    });
  }
}
