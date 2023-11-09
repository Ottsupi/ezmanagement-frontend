import { Component, EventEmitter, OnInit } from '@angular/core';
import { Inventory } from './inventory';
import { InventoryToCartService } from './inventory-to-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ezmanagement-frontend';

  constructor(
    private inventoryToCartService: InventoryToCartService
  ) {}
  
  handleSendToCart(data: Inventory) {
    this.inventoryToCartService.sendItem(data);
  }
  
}
