import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-contact',
  styleUrl: './contact.scss',
  templateUrl: './contact.html',
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);

  isSubmitting = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  contactForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }

    this.isSubmitting.set(true);
    this.successMessage.set(null);
    this.errorMessage.set(null);

    this.contactService.submit(this.contactForm.value as any).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.successMessage.set('Poruka je uspešno poslata!');
        this.contactForm.reset();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set('Greška pri slanju poruke. Pokušajte ponovo.');
        console.error(err);
      },
    });
  }
}