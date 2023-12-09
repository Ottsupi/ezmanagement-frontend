import { Component, OnDestroy, OnInit } from '@angular/core';
import { Inventory } from '../model/inventory';
import { InventoryService } from '../service/inventory.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

import { InventoryToCartService } from '../service/inventory-to-cart.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.css']
})
export class InventoryTableComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  allInventory: Inventory[] = [];
  filteredInventory: Inventory[] = [];
  selectedItem: Inventory = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
    description: ''
  };
  searchText: String = "";

  constructor(
    private inventoryService: InventoryService,
    private inventoryToCartService: InventoryToCartService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getFilteredInventory();
    this.inventoryToCartService.refreshInventoryRequest$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) this.getAllInventory();
      })
    this.inventoryToCartService.stockChanges$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.updateStock(res.id, res.qty);
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
  getFilteredInventory(): void {
    this.inventoryService.getAllInventory().subscribe({
      next: (response: Inventory[]) => {
        this.allInventory = response;
        this.filteredInventory = response;
        this.handleSearch(this.searchText);
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
        this.inventoryToCartService.requestRemoveItemById(this.selectedItem.id);
        this.getFilteredInventory();
			},
      error: (error) => {
        console.error(error);
      }
    });
  }

  onDeleteInventory(id: number) {
    this.inventoryToCartService.requestRemoveItemById(id);
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

  handleSearch(text: String) {
    this.filteredInventory = this.allInventory.filter(item => 
      item.name.toLowerCase().includes(text.toLowerCase()) ||
      item.description.toLowerCase().includes(text.toLowerCase())
    );
  }

  clearSearch() {
    this.handleSearch("");
    this.searchText = "";
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