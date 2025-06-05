import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SubNavComponent } from '../../shared/components/sub-nav/sub-nav.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, ButtonModule, HeaderComponent, SubNavComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  route: any = {};
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  title = '';

  private updateTitle() {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    this.title = route.snapshot.title || '';
  }

  ngOnInit() {
    this.updateTitle();

    this.route = this.activatedRoute.routeConfig;

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateTitle();
      });
  }
}
