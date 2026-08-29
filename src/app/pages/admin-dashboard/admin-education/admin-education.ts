import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EducationService } from '../../../core/services/education.service';
import { Education } from '../../../core/models/education.model';
import { MessageKey, Messages } from '../../../core/constants/messages';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-admin-education',
  styleUrl: './admin-education.scss',
  templateUrl: './admin-education.html',
})
export class AdminEducation implements OnInit {
  private fb = inject(FormBuilder);
  private educationService = inject(EducationService);

  educationList = signal<Education[]>([]);
  isLoading = signal(true);
  editingId = signal<number | null>(null);

  educationForm = this.fb.group({
    institution: ['', [Validators.required]],
    degree: ['', [Validators.required]],
    fieldOfStudy: [''],
    startDate: ['', [Validators.required]],
    endDate: [''],
    description: [''],
  });

  ngOnInit() {
    this.loadEducation();
  }

  loadEducation() {
    this.isLoading.set(true);
    this.educationService.getAll().subscribe({
      next: (data) => {
        this.educationList.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(Messages[MessageKey.EDUCATION_LOAD_FAILED], err);
        this.isLoading.set(false);
      },
    });
  }

  onSubmit() {
    if (this.educationForm.invalid) {
      return;
    }

    const formValue = this.educationForm.value as any;

    if (this.editingId() !== null) {
      this.educationService.update(this.editingId()!, formValue).subscribe({
        next: () => {
          this.resetForm();
          this.loadEducation();
        },
error: (err) => console.error(Messages[MessageKey.EDUCATION_UPDATE_FAILED], err),
      });
    } else {
      this.educationService.create(formValue).subscribe({
        next: () => {
          this.resetForm();
          this.loadEducation();
        },
error: (err) => console.error(Messages[MessageKey.EDUCATION_CREATE_FAILED], err),
      });
    }
  }

  startEdit(item: Education) {
    this.editingId.set(item.id);
    this.educationForm.setValue({
      institution: item.institution,
      degree: item.degree,
      fieldOfStudy: item.fieldOfStudy ?? '',
      startDate: item.startDate.split('T')[0],
      endDate: item.endDate ? item.endDate.split('T')[0] : '',
      description: item.description ?? '',
    });
  }

  cancelEdit() {
    this.resetForm();
  }

  deleteItem(id: number) {
if (!confirm(Messages[MessageKey.DELETE_CONFIRM])) {
      return;
    }

    this.educationService.remove(id).subscribe({
      next: () => this.loadEducation(),
error: (err) => console.error(Messages[MessageKey.EDUCATION_DELETE_FAILED], err),    });
  }

  private resetForm() {
    this.editingId.set(null);
    this.educationForm.reset();
  }
}
