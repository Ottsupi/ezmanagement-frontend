import { Component, OnInit } from '@angular/core';
import { Inventory } from '../inventory';
import { InventoryService } from '../inventory.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.css']
})
export class InventoryTableComponent implements OnInit {

  public allInventory: Inventory[] = [];
  closeResult: string = '';
  selectedItem: Inventory = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
    description: ''
  };

  constructor(
    private inventoryService: InventoryService,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.getAllInventory();
  }

  public getAllInventory(): void {
    this.inventoryService.getAllInventory().subscribe(
      (response: Inventory[]) => {
        this.allInventory = response;
      }
    )
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

  onAddInventory(addForm: NgForm) {
    this.inventoryService.addInventory(addForm.value).subscribe(
			(response: Inventory) => {
				console.log(response);
			}
		)
  }

  onUpdateInventory(editForm: NgForm) {
    this.inventoryService.updateInventory(editForm.value).subscribe(
			(response: Inventory) => {
				console.log(response);
			}
		)
  }

  onDeleteInventory(id: number) {
    this.inventoryService.deleteInventory(id).subscribe()
    // console.log(`to be deleted: ${id}`)
  }
}