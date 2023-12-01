import { TestBed } from '@angular/core/testing';

import { InventoryToCartService } from './service/inventory-to-cart.service';

describe('InventoryToCartService', () => {
  let service: InventoryToCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryToCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
