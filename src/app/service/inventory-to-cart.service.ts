import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Inventory } from '../model/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryToCartService {
  private item = new Subject<Inventory>();
  private refreshInventory = new Subject<boolean>();
  private stockChanges = new Subject<stockChange>();
  private itemId = new Subject<number>();

  itemObservable$ = this.item.asObservable();
  refreshInventoryRequest$ = this.refreshInventory.asObservable();
  stockChanges$ = this.stockChanges.asObservable();
  removeItemById$ = this.itemId.asObservable();

  sendItem(item: Inventory) {
    this.item.next(item)
  }
  requestRemoveItemById(id: number) {
    this.itemId.next(id);
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