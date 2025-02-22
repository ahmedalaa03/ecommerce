import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  isLoading1: boolean = false;
  isLoading2: boolean = false;
  isLoading3: boolean = false;
  msgError1: string = '';
  msgError2: string = '';
  msgError3: string = '';
  success: string = '';
  step: number = 1;
  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })
  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6}$/)])
  })
  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)])
  })
  verifyEmailSubmit(): void {
    if (this.verifyEmail.valid) {
      this.resetPassword.get('email')?.patchValue(this.verifyEmail.get('email')?.value)
      this.isLoading1 = true;
      this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
        next: (res) => { if (res.statusMsg == 'success') { this.step = 2; this.msgError1 = '' }; this.isLoading1 = false },
        error: (err) => { console.log(err); this.isLoading1 = false; this.msgError1 = err.error.message; }
      });
    }
  }
  verifyCodeSubmit(): void {
    if (this.verifyCode.valid) {
      this.isLoading2 = true;
      this.authService.setCodeVerify(this.verifyCode.value).subscribe({
        next: (res) => { if (res.status == 'Success') { this.step = 3; this.msgError2 = '' } this.isLoading2 = false; },
        error: (err) => { console.log(err); this.isLoading2 = false; this.msgError2 = err.error.message; }
      });
    }
  }
  resetPasswordSubmit(): void {
    if (this.resetPassword.valid) {
      this.isLoading3 = true;
      this.authService.setRestPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          if (res.statusMsg != 'fail') {
            localStorage.setItem('userToken', res.token);
            this.authService.saveUserData;
            setTimeout(() => { this.router.navigate(['/home']) }, 500);
            this.success = res.message; this.msgError3 = ''
          }
          this.isLoading3 = false;
        },
        error: (err) => { console.log(err); this.isLoading3 = false; this.msgError3 = err.error.message; this.success = ''; }
      });
    }
  }
}
