import { NgClass, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  QueryParamsHandling,
} from '@angular/router';

@Component({
  selector: 'app-sub-nav',
  imports: [NgIf, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './sub-nav.component.html',
})
export class SubNavComponent implements OnInit {
  expanded = false;
  @Input() item: any = {};

  constructor(private router: Router) {}

  handleExpanded() {
    this.expanded = !this.expanded;
  }

  ngOnInit() {
    const currentUrl = this.router.url.split('/')[2];
    if (currentUrl === this.item.path) {
      this.expanded = true;
    }
  }
}
