import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Cart } from '../cart';
import { Transaction } from './transaction';
import { TransactionItem } from './transaction-item';
import { Inventory } from '../inventory';
import { Subject, takeUntil } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { InventoryToCartService } from '../inventory-to-cart.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css']
})
export class CartTableComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  inCart: Cart[] = [];
  totalPrice: number = 0;
  totalQty: number = 0;

  constructor(
    private cartService: CartService,
    private inventoryToCartService: InventoryToCartService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.inventoryToCartService.itemObservable$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.addToCart(res);
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addToCart(item: Inventory) {
    const cartItem: Cart = {
      id: item.id,
      name: item.name,
      price: item.price,
      computedPrice: item.price,
      quantity: 0,
      stock: item.quantity
    }

    if (this.inCart.map(x => x.id).includes(item.id)) {
      let same = this.findItemIndexInCart(item.id);
      this.incrementQty(this.inCart[same]);
    } else {
      this.inCart.push(cartItem);
      this.incrementQty(cartItem);
    }
  }
  
  
  incrementQty(item: Cart) {
    item.quantity++;
    this.updatePrice(item);
    this.calculateTotalQty();

    this.inventoryToCartService.updateInventoryStock(item.id, -1);
  }

  decrementQty(item: Cart) {
    item.quantity--;
    this.updatePrice(item);
    this.calculateTotalQty();

    this.inventoryToCartService.updateInventoryStock(item.id, 1);
  }

  clickIncrement(item: Cart) {
    if (item.stock > item.quantity) this.incrementQty(item);
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
    const qtyList = this.inCart.map(x => x.quantity);
    let ctr = 0;
    qtyList.forEach((price: any) => {
      ctr += price;
    });
    
    this.totalQty = ctr;
  }

  findItemIndexInCart(id: number) {
    return this.inCart.findIndex((x) => x.id == id);
  }

  removeItem(id: number) {
    const index = this.findItemIndexInCart(id); 
    const qtyInCart = this.inCart[index].quantity;
    this.inCart.splice(index, 1);

    this.calculateTotalPrice();
    this.calculateTotalQty();
    this.inventoryToCartService.updateInventoryStock(id, qtyInCart);
  }

  clearCart() {
    this.inCart = [];
    this.totalPrice = 0;
    this.totalQty = 0;
    this.inventoryToCartService.requestRefreshInventory();
  }

  placeOrder() {
    let transaction = {
      totalPrice: this.totalPrice,
      totalQuantity: this.totalQty,
      totalItems: this.inCart.length
    }
    
    let transactionItemsList: any[] = [];
    this.inCart.forEach(item => {
        let transactionItem = {
          inventoryId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          totalPrice: item.computedPrice
        }
        transactionItemsList.push(transactionItem);
      });

    let orderDetails = {
      transaction: transaction,
      transactionItemsList: transactionItemsList
    }

    this.cartService.placeOrder(orderDetails).subscribe()
    this.clearCart();
  }

  openClearModal(modal: TemplateRef<any>) {
    if (this.inCart.length > 0) this.modalService.open(modal);
  }
}
