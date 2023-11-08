import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryAddmodalComponent } from './inventory-addmodal.component';

describe('InventoryAddmodalComponent', () => {
  let component: InventoryAddmodalComponent;
  let fixture: ComponentFixture<InventoryAddmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryAddmodalComponent]
    });
    fixture = TestBed.createComponent(InventoryAddmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
