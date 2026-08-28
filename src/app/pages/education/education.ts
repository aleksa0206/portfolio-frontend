import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationService } from '../../core/services/education.service';
import { Education } from '../../core/models/education.model';

@Component({
  imports: [CommonModule],
  selector: 'app-education',
  styleUrl: './education.scss',
  templateUrl: './education.html',
})
export class EducationComponent implements OnInit {
  private educationService = inject(EducationService);

  educationList = signal<Education[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    this.educationService.getAll().subscribe({
      next: (data) => {
        this.educationList.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load education:', err);
        this.isLoading.set(false);
      },
    });
  }
}