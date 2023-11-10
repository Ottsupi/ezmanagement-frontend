import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Inventory } from '../inventory';
import { InventoryService } from '../inventory.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { InventoryToCartService } from '../inventory-to-cart.service';

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.css']
})
export class InventoryTableComponent implements OnInit {

  allInventory: Inventory[] = [];
  emptyItem: Inventory = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
    description: ''
  };
  selectedItem: Inventory = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
    description: ''
  };

  constructor(
    private inventoryService: InventoryService,
    private inventoryToCartService: InventoryToCartService,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.getAllInventory();
    this.inventoryToCartService.refreshInventoryRequest$.subscribe((res) => {
      if (res) this.getAllInventory();
    })
    this.inventoryToCartService.stockChanges$.subscribe((res) => {
      this.updateStock(res.id, res.qty);
    })
  }

  getAllInventory(): void {
    this.inventoryService.getAllInventory().subscribe(
      (response: Inventory[]) => {
        this.allInventory = response;
      }
    )
  }

  sendToCart(inventory: Inventory): void {
    if (inventory.quantity > 0) {
      this.inventoryToCartService.sendItem(inventory);
    }
  }

  openModal(modal: any) {
		this.modalService.open(modal);
	}

  openModalView(modal: any, id: number) {
		this.modalService.open(modal);
    this.inventoryService.findInventory(id).subscribe(
			(response: Inventory) => {
				console.log(response);
        this.selectedItem = response;
			}
		)
	}

  openModalEdit(modal: any, id: number) {
		this.modalService.open(modal);
    this.inventoryService.findInventory(id).subscribe(
			(response: Inventory) => {
				console.log(response);
        this.selectedItem = response;
			}
		)
	}

  openModalDeleteConfirm(modal: any) {
		this.modalService.open(modal, { centered: true });
	}

  onAddInventory(addForm: NgForm) {
    this.inventoryService.addInventory(addForm.value).subscribe(
			(response: Inventory) => {
				console.log(response);
        this.getAllInventory();
			}
		)
  }

  onUpdateInventory(editForm: NgForm) {
    this.inventoryService.updateInventory(editForm.value).subscribe(
			(response: Inventory) => {
				console.log(response);
        this.getAllInventory();
			}
		)
  }

  onDeleteInventory(id: number) {
    this.inventoryService.deleteInventory(id).subscribe(
      () => {
        this.getAllInventory();
        this.modalService.dismissAll();
      }
    )
  }

  updateStock(id: number, qty: number) {
    this.allInventory.forEach(item => {
      if (item.id == id) {
        item.quantity += qty;
      }
    });
    // item.quantity += qty;
  }
}