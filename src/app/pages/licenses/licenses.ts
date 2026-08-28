import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseService } from '../../core/services/license.service';
import { License } from '../../core/models/license.model';

@Component({
  imports: [CommonModule],
  selector: 'app-licenses',
  styleUrl: './licenses.scss',
  templateUrl: './licenses.html',
})
export class LicensesComponent implements OnInit {
  private licenseService = inject(LicenseService);

  licenseList = signal<License[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    this.licenseService.getAll().subscribe({
      next: (data) => {
        this.licenseList.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load licenses:', err);
        this.isLoading.set(false);
      },
    });
  }
}