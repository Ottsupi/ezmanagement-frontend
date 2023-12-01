import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopWindowComponent } from './shop-window.component';

describe('ShopWindowComponent', () => {
  let component: ShopWindowComponent;
  let fixture: ComponentFixture<ShopWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopWindowComponent]
    });
    fixture = TestBed.createComponent(ShopWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
