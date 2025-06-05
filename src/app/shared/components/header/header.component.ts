import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { SvgIconDirective } from '../../directives/svg-icon.directive';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, SvgIconDirective, AvatarModule, OverlayBadgeModule],
  templateUrl: './header.component.html',
  styles: `
    :host {
      position: sticky;
      top: 0;
      z-index: 10;
    }
  `,
})
export class HeaderComponent {}
