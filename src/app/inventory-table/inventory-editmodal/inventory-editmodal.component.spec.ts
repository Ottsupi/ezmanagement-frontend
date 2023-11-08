import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryEditmodalComponent } from './inventory-editmodal.component';

describe('InventoryEditmodalComponent', () => {
  let component: InventoryEditmodalComponent;
  let fixture: ComponentFixture<InventoryEditmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryEditmodalComponent]
    });
    fixture = TestBed.createComponent(InventoryEditmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
