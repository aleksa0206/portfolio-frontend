import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Education, EducationInput } from '../models/education.model';

@Service()
export class EducationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/education`;

  getAll() {
    return this.http.get<Education[]>(this.apiUrl);
  }

  create(data: EducationInput) {
    return this.http.post<Education>(this.apiUrl, data);
  }

  update(id: number, data: Partial<EducationInput>) {
    return this.http.put<Education>(`${this.apiUrl}/${id}`, data);
  }

  remove(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}