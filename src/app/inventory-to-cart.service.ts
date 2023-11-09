import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Inventory } from './inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryToCartService {
  private item = new Subject<Inventory>();
  private refreshInventory = new Subject<boolean>();

  itemObservable$ = this.item.asObservable();
  refreshInventoryRequest$ = this.refreshInventory.asObservable();

  sendItem(item: Inventory) {
    this.item.next(item)
  }
  requestRefreshInventory() {
    this.refreshInventory.next(true)
  }

  constructor() { }
}
