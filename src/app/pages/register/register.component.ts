import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  isLoading:WritableSignal<boolean> = signal(false);
    msgError:WritableSignal<string> = signal('');
    success:WritableSignal<string> = signal('');
  registerForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]],
    rePassword: [null, [Validators.required]],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  }, { validators: this.confirmPassword });
  submitForm(): void {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.authService.sendRegisterForm(this.registerForm.value).subscribe({
        next: (response) => { if (response.message === 'success') { setTimeout(() => { this.router.navigate(['/login']) }, 500); this.success = response.message; this.msgError.set(''); }; this.isLoading.set(false) }, error: (error: HttpErrorResponse) => {
          this.msgError = error.error.message; setTimeout(() => {
            this.msgError.set('');
          }, 5000); this.success.set(''); this.isLoading.set(false);
        }
      })
    } else { this.registerForm.markAllAsTouched(); this.registerForm.get('rePassword')?.setErrors({ 'mismatch': true }); }
  }
  confirmPassword(group: AbstractControl) {
    return group.get('password')?.value === group.get('rePassword')?.value ? null : { 'mismatch': true };
  }
}
