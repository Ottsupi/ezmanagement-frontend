import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Inventory } from './inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryToCartService {
  private item = new Subject<Inventory>();
  private refreshInventory = new Subject<boolean>();
  private stockChanges = new Subject<stockChange>();

  itemObservable$ = this.item.asObservable();
  refreshInventoryRequest$ = this.refreshInventory.asObservable();
  stockChanges$ = this.stockChanges.asObservable();

  sendItem(item: Inventory) {
    this.item.next(item)
  }
  requestRefreshInventory() {
    this.refreshInventory.next(true)
  }
  updateInventoryStock(id: number, qty: number) {
    const change: stockChange = {
      id: id,
      qty: qty
    }
    this.stockChanges.next(change);
  }

  constructor() { }
}

interface stockChange {
  id: number,
  qty: number
}