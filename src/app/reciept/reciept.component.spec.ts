import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecieptComponent } from './reciept.component';

describe('RecieptComponent', () => {
  let component: RecieptComponent;
  let fixture: ComponentFixture<RecieptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecieptComponent]
    });
    fixture = TestBed.createComponent(RecieptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
