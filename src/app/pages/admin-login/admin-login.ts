import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MessageKey, Messages } from '../../core/constants/messages';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-admin-login',
  styleUrl: './admin-login.scss',
  templateUrl: './admin-login.html',
})
export class AdminLogin {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  errorMessage = signal<string | null>(null);
  isLoading = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { email, password } = this.loginForm.value;

    this.auth.login(email!, password!).subscribe({
      next: (response) => {
        this.auth.saveToken(response.token);
        this.isLoading.set(false);
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(Messages[MessageKey.LOGIN_FAILED]);
        console.error(err);
      },
    });
  }
}
