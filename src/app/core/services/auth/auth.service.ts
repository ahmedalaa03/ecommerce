import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }
  private readonly router = inject(Router);
  userData: any = null;
  sendRegisterForm(registerForm: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, registerForm)
  }
  sendLoginForm(registerForm: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, registerForm)
  }
  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
    }
  }
  signOut(): void {
    localStorage.removeItem('userToken');
    this.userData = null;
    this.router.navigate(['/login']);
  }
  setEmailVerify(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/api/v1/auth/forgotPasswords', data)
  }
  setCodeVerify(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/api/v1/auth/verifyResetCode', data)
  }
  setRestPassword(data: object): Observable<any> {
    return this.httpClient.put(environment.baseUrl + '/api/v1/auth/resetPassword', data)
  }
}
