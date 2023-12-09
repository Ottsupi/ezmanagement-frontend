import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RecieptService } from '../service/reciept.service';
import { Transaction } from '../model/transaction';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionItem } from '../model/transaction-item';

@Component({
  selector: 'app-reciept',
  templateUrl: './reciept.component.html',
  styleUrls: ['./reciept.component.css']
})
export class RecieptComponent implements OnInit {

  constructor(
    private recieptService: RecieptService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllTransactions();
  }


  allTransaction: Transaction[] = [];
  printQueue: Transaction[] = [];
  selectedTransaction: Transaction = {} as Transaction;
  selectedTransactionItemList: TransactionItem[] = [];


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
      this.printQueue.sort((a, b) => a.totalItems - b.totalItems);
    }
  }

  removeFromPrintQueue(reciept: Transaction): void {
    let index = this.printQueue.findIndex(x => x.id === reciept.id);
    if (index !== -1) {
      this.printQueue.splice(index, 1);
    }
  }

  removeFromPrintQueueById(id: number): void {
    let index = this.printQueue.findIndex(x => x.id === id);
    if (index !== -1) {
      this.printQueue.splice(index, 1);
    }
  }

  clearPrintQueue(): void {
    this.printQueue = [];
  }

  sendPrintRequest(printList: number[]): void {
    this.recieptService.getTestPrint().subscribe(response => {
      this.handleFileDownload(response);
    });
  }

  onClickPrint(): void {
    let idList = this.printQueue.map(x => x.id);
    console.log('Print list: ' + idList.toString())
    // this.sendPrintRequest(idList);
    this.recieptService.sendPrintRequest(idList).subscribe(response => {
      this.handleFileDownload(response);
    });
  }

  private handleFileDownload(response: HttpResponse<Blob>): void {
    const contentDispositionHeader = response.headers.get('Content-Disposition');
    console.log(contentDispositionHeader);
    if (contentDispositionHeader != null) {
      const filename = contentDispositionHeader.split(';')[1].trim().split('=')[1];
  
      const blob = new Blob([response.body as BlobPart], { type: response.body?.type });
  
      // Create a link element and trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } else {
      console.error('Content-Disposition header is missing in the response.');
    }
  }

  openModalViewTransaction(modal: any, id: number) {
    this.recieptService.findTransaction(id).subscribe(
      res => {this.selectedTransaction = res}
    )
    this.recieptService.findTransactionDetails(id).subscribe(
      res => {this.selectedTransactionItemList = res}
    )

    this.modalService.open(modal, {size: 'lg'});
	}

  openModalDeleteTransaction(modal: any, id: number) {
    this.modalService.open(modal, { centered: true });
  }

  
  onDeleteTransaction(id: number) {
    this.removeFromPrintQueueById(id)
    this.recieptService.deleteTransaction(id).subscribe({
      complete: () => {
        this.getAllTransactions();
        this.modalService.dismissAll();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


}
