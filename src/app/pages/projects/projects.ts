import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../core/models/project.model';

@Component({
  imports: [CommonModule],
  selector: 'app-projects',
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
})
export class ProjectsComponent implements OnInit {
  private projectService = inject(ProjectService);

  projectList = signal<Project[]>([]);
  isLoading = signal(true);

  ngOnInit() {
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
}