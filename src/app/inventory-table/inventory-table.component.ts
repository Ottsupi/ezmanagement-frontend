import { Component, OnInit } from '@angular/core';
import { Inventory } from '../inventory';
import { InventoryService } from '../inventory.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.css']
})
export class InventoryTableComponent implements OnInit {
  public allInventory: Inventory[] = [];

  constructor(private inventoryService: InventoryService) {}
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
}
