import { Component, OnInit, inject, signal } from '@angular/core';
import { ContactService } from '../../../core/services/contact.service';
import { ContactMessage } from '../../../core/models/contact.model';

@Component({
  imports: [],
  selector: 'app-admin-contact',
  styleUrl: './admin-contact.scss',
  templateUrl: './admin-contact.html',
})
export class AdminContact implements OnInit {
  private contactService = inject(ContactService);

  messages = signal<ContactMessage[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.isLoading.set(true);
    this.contactService.getAll().subscribe({
      next: (data) => {
        this.messages.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load messages:', err);
        this.isLoading.set(false);
      },
    });
  }

  markAsRead(id: number) {
    this.contactService.markAsRead(id).subscribe({
      next: () => this.loadMessages(),
      error: (err) => console.error('Failed to mark as read:', err),
    });
  }

  deleteMessage(id: number) {
    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }

    this.contactService.remove(id).subscribe({
      next: () => this.loadMessages(),
      error: (err) => console.error('Failed to delete message:', err),
    });
  }
}