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
    return this.httpClient.post(environment.baseUrl+'/api/v1/cart', { "productId": id }, { headers: { token: this.myToken } });
  }
  getLLoggedUserCart(): Observable<any> {
    return this.httpClient.get(environment.baseUrl+'/api/v1/cart', { headers: { token: this.myToken } });
  }
  RemoveSpecificCartItem(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`, { headers: { token: this.myToken } });
  }
  updateCartProductQuantity(id: string, count: number): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`, { "count": count }, { headers: { token: this.myToken } });
  }
  clearUserCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`, { headers: { token: this.myToken } });
  }
}
