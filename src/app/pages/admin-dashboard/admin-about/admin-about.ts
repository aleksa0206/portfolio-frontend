import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AboutService } from '../../../core/services/about.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-admin-about',
  styleUrl: './admin-about.scss',
  templateUrl: './admin-about.html',
})
export class AdminAbout implements OnInit {
  private fb = inject(FormBuilder);
  private aboutService = inject(AboutService);

  isLoading = signal(true);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  aboutForm = this.fb.group({
    fullName: ['', [Validators.required]],
    title: ['', [Validators.required]],
    bio: ['', [Validators.required]],
    photoUrl: [''],
    email: [''],
    phone: [''],
    location: [''],
  });

  ngOnInit() {
    this.aboutService.get().subscribe({
      next: (data) => {
        if (data) {
          this.aboutForm.setValue({
            fullName: data.fullName,
            title: data.title,
            bio: data.bio,
            photoUrl: data.photoUrl ?? '',
            email: data.email ?? '',
            phone: data.phone ?? '',
            location: data.location ?? '',
          });
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load about data:', err);
        this.isLoading.set(false);
      },
    });
  }

  onSubmit() {
    if (this.aboutForm.invalid) {
      return;
    }

    this.successMessage.set(null);
    this.errorMessage.set(null);

    const formValue = this.aboutForm.value as any;

    this.aboutService.save(formValue).subscribe({
      next: () => {
        this.successMessage.set('About section saved successfully!');
      },
      error: (err) => {
        this.errorMessage.set('Failed to save. Please try again.');
        console.error(err);
      },
    });
  }
}