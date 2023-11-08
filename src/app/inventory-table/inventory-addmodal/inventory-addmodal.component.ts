import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Inventory } from 'src/app/inventory';
import { InventoryService } from 'src/app/inventory.service';

@Component({
  selector: 'app-inventory-addmodal',
  templateUrl: './inventory-addmodal.component.html',
  styleUrls: ['./inventory-addmodal.component.css']
})
export class InventoryAddmodalComponent {
	closeResult = '';

	constructor(
		private modalService: NgbModal,
		private inventoryService: InventoryService
	) {}

	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
  	}

  	public onAddInventory(addForm: NgForm): void {

		this.inventoryService.addInventory(addForm.value).subscribe(
			(response: Inventory) => {
				console.log(response);
			}
		)
	}
}
