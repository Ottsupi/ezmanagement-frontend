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
  totalPrice: number = 0;
  totalQty: number = 0;

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

    if (this.inCart.map(x => x.id).includes(item.id)) {
      let same = this.findItemIndexInCart(item.id);
      this.incrementQty(this.inCart[same]);
    } else {
      this.inCart.push(cartItem);
      this.calculateTotalPrice();
      this.calculateTotalQty();
    }
  }
  
  
  incrementQty(item: Cart) {
    item.quantity++;
    this.updatePrice(item);
    this.calculateTotalQty();
  }

  decrementQty(item: Cart) {
    item.quantity--;
    this.updatePrice(item);
    this.calculateTotalQty();
  }

  clickIncrement(item: Cart) {
    this.incrementQty(item);
  }
  
  clickDecrement(item: Cart) {
    if (item.quantity > 1) this.decrementQty(item);
  }

  updatePrice(item: Cart) {
    item.computedPrice = item.quantity * item.price;
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    const priceList = this.inCart.map(x => x.computedPrice);
    let ctr = 0;
    priceList.forEach((price: any) => {
      ctr += price;
    });
    
    this.totalPrice = ctr;
  }

  calculateTotalQty() {
    this.totalQty = this.inCart.length;
  }

  clearCart() {
    this.inCart = [];
    this.totalPrice = 0;
    this.totalQty = 0;
    this.inventoryToCartService.requestRefreshInventory();
  }

  findItemIndexInCart(id: number) {
    const itemIDsInCart = this.inCart.map(x => x.id);
    return itemIDsInCart.findIndex((x) => x == id);
  }

  removeItem(id: number) {
    const index = this.findItemIndexInCart(id);
    const newCart = this.inCart.filter(x => x.id !== id);
    this.inCart = newCart;

    this.totalQty = this.inCart.length;
    this.calculateTotalPrice();
  }
}
