import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly FormBuilder = inject(FormBuilder);
  isLoading: WritableSignal<boolean> = signal(false);
  loginForm: FormGroup = this.FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]]
  });
  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            localStorage.setItem('userToken', res.token);
            this.authService.saveUserData();
            this.router.navigate(['/home']);
          };
          this.isLoading.set(false);
        },
        error: () => { this.isLoading.set(false); }
      })
    } else { this.loginForm.markAllAsTouched(); }
  }
}
