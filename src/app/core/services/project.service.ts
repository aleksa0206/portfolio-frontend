import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Project, ProjectInput } from '../models/project.model';

@Service()
export class ProjectService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/projects`;

  getAll() {
    return this.http.get<Project[]>(this.apiUrl);
  }

  create(data: ProjectInput) {
    return this.http.post<Project>(this.apiUrl, data);
  }

  update(id: number, data: Partial<ProjectInput>) {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, data);
  }

  remove(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}