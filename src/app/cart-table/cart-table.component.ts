import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Cart } from '../cart';
import { Inventory } from '../inventory';
import { InventoryToCartService } from '../inventory-to-cart.service';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css']
})
export class CartTableComponent implements OnInit {

  inCart: Cart[] = [];

  constructor(
    private inventoryToCartService: InventoryToCartService
  ) {}

  ngOnInit(): void {
    this.inventoryToCartService.itemObservable$.subscribe((res) => {
      this.addToCart(res);
    })
  }

  addToCart(item: Inventory) {
    const cartItem: Cart = {
      id: item.id,
      name: item.name,
      price: item.price,
      computedPrice: item.price,
      quantity: 1
    }

    const itemIDsInCart = this.inCart.map(x => x.id)
    if (itemIDsInCart.includes(item.id)) {
      let same = itemIDsInCart.findIndex((id) => id == item.id);
      this.incrementQty(this.inCart[same]);
    } else {
      this.inCart.push(cartItem);
    }
  }
  
  
  incrementQty(item: Cart) {
    item.quantity++;
    this.updatePrice(item);
  }

  updatePrice(item: Cart) {
    item.computedPrice = item.quantity * item.price;
  }

  calculateTotalPrice() {

  }
}
