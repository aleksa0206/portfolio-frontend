import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ContactMessage, ContactMessageInput } from '../models/contact.model';

@Service()
export class ContactService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/contact`;

  submit(data: ContactMessageInput) {
    return this.http.post(this.apiUrl, data);
  }

   getAll() {
    return this.http.get<ContactMessage[]>(this.apiUrl);
  }

  markAsRead(id: number) {
    return this.http.put<ContactMessage>(`${this.apiUrl}/${id}/read`, {});
  }

  remove(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}