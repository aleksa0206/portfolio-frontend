import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

const ROUTE_LABELS: Record<string, string> = {
  '/': 'HOME',
  '/education': 'EDUCATION',
  '/licenses': 'LICENSES',
  '/projects': 'PROJECTS',
  '/contact': 'CONTACT',
  '/admin/login': 'ADMIN',
};

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('portfolio-frontend');
  private router = inject(Router);
  private hideTimeout?: ReturnType<typeof setTimeout>;

  isTransitioning = signal(false);
  transitionText = signal('');

  constructor() {
    this.router.events.pipe(filter((e) => e instanceof NavigationStart)).subscribe((event) => {
      const navEvent = event as NavigationStart;
      this.transitionText.set(this.getRouteLabel(navEvent.url));

      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
      }
      this.isTransitioning.set(false);
      setTimeout(() => this.isTransitioning.set(true), 0);
    });

    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.hideTimeout = setTimeout(() => this.isTransitioning.set(false), 1400);
    });
  }

  private getRouteLabel(url: string): string {
    const basePath = '/' + url.split('/').filter(Boolean)[0] || '/';
    return ROUTE_LABELS[url] ?? ROUTE_LABELS[basePath] ?? 'ALEKSA.';
  }
}