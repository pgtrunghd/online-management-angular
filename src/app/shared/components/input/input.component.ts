import { NgClass, NgIf } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [NgClass, NgIf],
  templateUrl: './input.component.html',
  styles: `
  :host {
    display: block;
  }
  `,
})
export class InputComponent {
  icon = input<Element>();
  label = input<string>();
}
