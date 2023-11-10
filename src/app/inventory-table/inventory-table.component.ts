import { Component, OnInit } from '@angular/core';
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
    this.inventoryService.getAllInventory().subscribe({
      next: (response: Inventory[]) => {
        this.allInventory = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  sendToCart(inventory: Inventory): void {
    if (inventory.quantity > 0) {
      this.inventoryToCartService.sendItem(inventory);
    }
  }

  onAddInventory(addForm: NgForm) {
    this.inventoryService.addInventory(addForm.value).subscribe({
      next: (response: Inventory) => {
				console.log(response);
        this.getAllInventory();
			},
      error: (error) => {
        console.error(error);
      }
    });
  }

  onUpdateInventory(editForm: NgForm) {
    this.inventoryService.updateInventory(editForm.value).subscribe({
      complete: () => {
        this.getAllInventory();
			},
      error: (error) => {
        console.error(error);
      }
    });
  }

  onDeleteInventory(id: number) {
    this.inventoryService.deleteInventory(id).subscribe({
      complete: () => {
        this.getAllInventory();
        this.modalService.dismissAll();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  updateStock(id: number, qty: number) {
    this.allInventory.forEach(item => {
      if (item.id == id) {
        item.quantity += qty;
      }
    });
  }


  
  openModal(modal: any) {
		this.modalService.open(modal);
	}

  openModalView(modal: any, id: number) {
    this.inventoryService.findInventory(id).subscribe({
      next: (response: Inventory) => {
        this.selectedItem = response;
			},
      error: (error) => {
        console.error(error);
      }
    });
    this.modalService.open(modal);
	}

  openModalEdit(modal: any, id: number) {
    this.inventoryService.findInventory(id).subscribe({
      next: (response: Inventory) => {
        this.selectedItem = response;
			},
      error: (error) => {
        console.error(error);
      }
    });
    this.modalService.open(modal);
	}

  openModalDeleteConfirm(modal: any) {
		this.modalService.open(modal, { centered: true });
	}

}