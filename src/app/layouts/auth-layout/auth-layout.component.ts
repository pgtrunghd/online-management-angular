import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoIconComponent } from "../../shared/icons/logo-icon.component";
import { LogoLargeIconComponent } from "../../shared/icons/logo-large-icon.component";

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, LogoIconComponent, LogoLargeIconComponent],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {}
