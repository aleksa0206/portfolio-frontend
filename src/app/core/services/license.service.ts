import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { License, LicenseInput } from '../models/license.model';

@Service()
export class LicenseService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/licenses`;

  getAll() {
    return this.http.get<License[]>(this.apiUrl);
  }

  create(data: LicenseInput) {
    return this.http.post<License>(this.apiUrl, data);
  }

  update(id: number, data: Partial<LicenseInput>) {
    return this.http.put<License>(`${this.apiUrl}/${id}`, data);
  }

  remove(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}