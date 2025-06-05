import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from '@shared/shared';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  url = 'https://jsonplaceholder.typicode.com/todos';
  https = inject(HttpClient);

  ngOnInit(): void {
    this.https.get(this.url).subscribe((data) => {
      console.log(data);
    });
  }
}
