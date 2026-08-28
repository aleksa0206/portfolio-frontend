import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/models/project.model';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-admin-project',
  styleUrl: './admin-project.scss',
  templateUrl: './admin-project.html',
})
export class AdminProject implements OnInit {
  private fb = inject(FormBuilder);
  private projectService = inject(ProjectService);

  projectList = signal<Project[]>([]);
  isLoading = signal(true);
  editingId = signal<number | null>(null);

  projectForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    imageUrl: [''],
    demoUrl: [''],
    repoUrl: [''],
    techStack: ['', [Validators.required]],
  });

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.isLoading.set(true);
    this.projectService.getAll().subscribe({
      next: (data) => {
        this.projectList.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load projects:', err);
        this.isLoading.set(false);
      },
    });
  }

  onSubmit() {
    if (this.projectForm.invalid) {
      return;
    }

    const formValue = this.projectForm.value as any;

    if (this.editingId() !== null) {
      this.projectService.update(this.editingId()!, formValue).subscribe({
        next: () => {
          this.resetForm();
          this.loadProjects();
        },
        error: (err) => console.error('Failed to update project:', err),
      });
    } else {
      this.projectService.create(formValue).subscribe({
        next: () => {
          this.resetForm();
          this.loadProjects();
        },
        error: (err) => console.error('Failed to create project:', err),
      });
    }
  }

  startEdit(item: Project) {
    this.editingId.set(item.id);
    this.projectForm.setValue({
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl ?? '',
      demoUrl: item.demoUrl ?? '',
      repoUrl: item.repoUrl ?? '',
      techStack: item.techStack,
    });
  }

  cancelEdit() {
    this.resetForm();
  }

  deleteItem(id: number) {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    this.projectService.remove(id).subscribe({
      next: () => this.loadProjects(),
      error: (err) => console.error('Failed to delete project:', err),
    });
  }

  private resetForm() {
    this.editingId.set(null);
    this.projectForm.reset();
  }
}