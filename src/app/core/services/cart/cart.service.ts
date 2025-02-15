import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private httpClient: HttpClient) { }
  myToken: any = localStorage.getItem('userToken');
  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(environment.baseUrl+'/api/v1/cart', { "productId": id });
  }
  getLLoggedUserCart(): Observable<any> {
    return this.httpClient.get(environment.baseUrl+'/api/v1/cart');
  }
  RemoveSpecificCartItem(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`);
  }
  updateCartProductQuantity(id: string, count: number): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`, { "count": count });
  }
  clearUserCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`);
  }
}
