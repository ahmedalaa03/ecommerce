import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  isLoading: boolean = false;
  msgError: string = '';
  success: string = '';
  registerForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]],
    rePassword: [null, [Validators.required]],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  }, { validators: this.confirmPassword });
  // registerForm: FormGroup = new FormGroup({
  //   name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]),
  //   rePassword: new FormControl(null, [Validators.required]),
  //   phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  // }, { validators: this.confirmPassword });
  submitForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.sendRegisterForm(this.registerForm.value).subscribe({
        next: (response) => { if (response.message === 'success') { setTimeout(() => { this.router.navigate(['/login']) }, 500); this.success = response.message; this.msgError = ''; }; this.isLoading = false }, error: (error: HttpErrorResponse) => {
          this.msgError = error.error.message; setTimeout(() => {
            this.msgError = '';
          }, 5000); this.success = ''; this.isLoading = false;
        }
      })
    } else { this.registerForm.markAllAsTouched(); this.registerForm.get('rePassword')?.setErrors({ 'mismatch': true }); }
  }
  confirmPassword(group: AbstractControl) {
    return group.get('password')?.value === group.get('rePassword')?.value ? null : { 'mismatch': true };
  }
}
