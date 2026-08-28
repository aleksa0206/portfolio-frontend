import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AboutService } from '../../core/services/about.service';
import { About } from '../../core/models/about.model';

@Component({
  imports: [RouterLink],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit {
  private aboutService = inject(AboutService);

  about = signal<About | null>(null);
  isLoading = signal(true);

  ngOnInit() {
    this.aboutService.get().subscribe({
      next: (data) => {
        this.about.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load about data:', err);
        this.isLoading.set(false);
      },
    });
  }
}