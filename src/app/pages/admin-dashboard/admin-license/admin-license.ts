import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LicenseService } from '../../../core/services/license.service';
import { License } from '../../../core/models/license.model';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-admin-license',
  styleUrl: './admin-license.scss',
  templateUrl: './admin-license.html',
})
export class AdminLicense implements OnInit {
  private fb = inject(FormBuilder);
  private licenseService = inject(LicenseService);

  licenseList = signal<License[]>([]);
  isLoading = signal(true);
  editingId = signal<number | null>(null);

  licenseForm = this.fb.group({
    name: ['', [Validators.required]],
    issuer: ['', [Validators.required]],
    issueDate: ['', [Validators.required]],
    expiryDate: [''],
    credentialUrl: [''],
  });

  ngOnInit() {
    this.loadLicenses();
  }

  loadLicenses() {
    this.isLoading.set(true);
    this.licenseService.getAll().subscribe({
      next: (data) => {
        this.licenseList.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Greška pri učitavanju:', err);
        this.isLoading.set(false);
      },
    });
  }

  onSubmit() {
    if (this.licenseForm.invalid) {
      return;
    }

    const formValue = this.licenseForm.value as any;

    if (this.editingId() !== null) {
      this.licenseService.update(this.editingId()!, formValue).subscribe({
        next: () => {
          this.resetForm();
          this.loadLicenses();
        },
        error: (err) => console.error('Greška pri izmeni:', err),
      });
    } else {
      this.licenseService.create(formValue).subscribe({
        next: () => {
          this.resetForm();
          this.loadLicenses();
        },
        error: (err) => console.error('Greška pri kreiranju:', err),
      });
    }
  }

  startEdit(item: License) {
    this.editingId.set(item.id);
    this.licenseForm.setValue({
      name: item.name,
      issuer: item.issuer,
      issueDate: item.issueDate.split('T')[0],
      expiryDate: item.expiryDate ? item.expiryDate.split('T')[0] : '',
      credentialUrl: item.credentialUrl ?? '',
    });
  }

  cancelEdit() {
    this.resetForm();
  }

  deleteItem(id: number) {
    if (!confirm('Da li sigurno želiš da obrišeš ovaj unos?')) {
      return;
    }

    this.licenseService.remove(id).subscribe({
      next: () => this.loadLicenses(),
      error: (err) => console.error('Greška pri brisanju:', err),
    });
  }

  private resetForm() {
    this.editingId.set(null);
    this.licenseForm.reset();
  }
}