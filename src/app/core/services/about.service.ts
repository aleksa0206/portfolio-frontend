import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { About, AboutInput } from '../models/about.model';

@Service()
export class AboutService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/about`;

  get() {
    return this.http.get<About>(this.apiUrl);
  }

  save(data: AboutInput) {
    return this.http.put<About>(this.apiUrl, data);
  }
}
