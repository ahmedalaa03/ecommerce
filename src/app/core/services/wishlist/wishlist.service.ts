import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  constructor(private httpClient: HttpClient) { }
addProductToWishlist(id: string): Observable<any> {
    return this.httpClient.post(environment.baseUrl+'/api/v1/wishlist', { "productId": id });
  }
  RemoveProductFromWishlist(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`);
  }
  getLoggedUserWishlist(): Observable<any> {
    return this.httpClient.get(environment.baseUrl+'/api/v1/wishlist');
  }
}
