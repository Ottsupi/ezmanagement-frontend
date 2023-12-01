import { Component, OnInit } from '@angular/core';
import { RecieptService } from '../service/reciept.service';
import { Transaction } from '../model/transaction';

@Component({
  selector: 'app-reciept',
  templateUrl: './reciept.component.html',
  styleUrls: ['./reciept.component.css']
})
export class RecieptComponent implements OnInit {

  constructor(
    private recieptService: RecieptService
  ) {}

  ngOnInit(): void {
    this.getAllTransactions();
  }


  allTransaction: Transaction[] = [];
  printQueue: Transaction[] = [];


  getAllTransactions(): void {
    this.recieptService.getAllTransactions().subscribe({
      next: (res: Transaction[]) => {
        this.allTransaction = res;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  addToPrintQueue(reciept: Transaction): void {
    let check = this.printQueue.find(x => x.id === reciept.id);
    if (check === undefined) {
      this.printQueue.push(reciept);
      this.printQueue.sort((a, b) => b.totalItems - a.totalItems);
    }
  }

  removeFromPrintQueue(reciept: Transaction): void {
    let index = this.printQueue.findIndex(x => x.id === reciept.id);
    if (index !== -1) {
      this.printQueue.splice(index, 1);
    }
  }

  clearPrintQueue(): void {
    this.printQueue = [];
  }
}
