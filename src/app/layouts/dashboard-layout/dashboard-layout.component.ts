import { Component, OnInit, computed, inject, signal } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';
import { SvgIconDirective } from '../../shared/directives/svg-icon.directive';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, SvgIconDirective, RouterLink, RouterLinkActive],
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  currentUrl = signal<string>(this.router.url);
  routes = signal<any[]>([]);

  subRoutes = computed(() =>
    this.routes().find((item) => `/${item.path}` === this.currentUrl())
  );

  isActive(url: string): boolean {
    return this.router.url === url;
  }

  ngOnInit() {
    const children = this.route.routeConfig?.children ?? [];
    this.routes.set(children.filter((item) => item.path));

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.currentUrl.set(this.router.url);
      });
  }
}
