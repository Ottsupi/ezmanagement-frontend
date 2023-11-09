import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Inventory } from './inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryToCartService {
  private item = new Subject<Inventory>();

  itemObservable$ = this.item.asObservable();

  sendItem(item: Inventory) {
    this.item.next(item)
  }

  constructor() { }
}
