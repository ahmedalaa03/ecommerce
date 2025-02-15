import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink,TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly FormBuilder = inject(FormBuilder);
  isLoading: boolean = false;
  msgError: string = '';
  success: string = '';
  loginForm: FormGroup = this.FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]]
  });
  // loginForm: FormGroup = new FormGroup({
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)])
  // });
  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            localStorage.setItem('userToken', res.token);
            this.authService.saveUserData();
            setTimeout(() => { this.router.navigate(['/home']) }, 500);
            this.success = res.message; this.msgError = '';
          };
          this.isLoading = false
        },
        error: (error: HttpErrorResponse) => {
          this.msgError = error.error.message; setTimeout(() => {
            this.msgError = '';
          }, 5000); this.success = ''; this.isLoading = false;
        }
      })
    } else { this.loginForm.markAllAsTouched(); }
  }
}
