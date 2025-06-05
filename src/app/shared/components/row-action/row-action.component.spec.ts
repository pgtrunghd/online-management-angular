import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowActionComponent } from './row-action.component';

describe('RowActionComponent', () => {
  let component: RowActionComponent;
  let fixture: ComponentFixture<RowActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
