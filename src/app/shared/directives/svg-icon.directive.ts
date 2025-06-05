import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appSvgIcon]',
})
export class SvgIconDirective implements OnInit {
  @Input() appSvgIcon: string = ''; // Đường dẫn file SVG
  @Input() svgClasses: string = ''; // Các class Tailwind để áp dụng lên SVG

  constructor(
    private el: ElementRef,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    if (this.appSvgIcon) {
      // Tải nội dung SVG từ file
      this.http.get(this.appSvgIcon, { responseType: 'text' }).subscribe(
        (svgContent) => {
          // Chèn nội dung SVG vào element
          this.el.nativeElement.innerHTML = svgContent;

          // Áp dụng Tailwind classes lên SVG
          const svgElement = this.el.nativeElement.querySelector('svg');
          if (svgElement && this.svgClasses) {
            svgElement.classList.add(...this.svgClasses.split(' '));
          }
        },
        (error) => {
          console.error('Error loading SVG:', error);
          this.el.nativeElement.innerHTML = '<span>Error loading SVG</span>';
        }
      );
    }
  }
}
