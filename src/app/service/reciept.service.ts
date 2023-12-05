import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Transaction } from '../model/transaction';
import { TransactionItem } from '../model/transaction-item';

@Injectable({
  providedIn: 'root'
})
export class RecieptService {
  apiServerUrl = environment.apiBaseUrl;

  public headers = new HttpHeaders({
    'ngrok-skip-browser-warning': '123', 
    'Content-Type': 'application/json', 
    'Authorization': '2Z0qSZdPytvF4rh1rCJe1yJ6HTK_44wS9aeRcGE1WE9WQJUYQ'
  });

  constructor(private http: HttpClient) { }

  public getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiServerUrl}/transaction/all`, {headers: this.headers});
  }

  public findTransactionDetails(id: number): Observable<TransactionItem[]> {
    return this.http.get<TransactionItem[]>(`${this.apiServerUrl}/transaction/find/${id}/items`, {headers: this.headers});
  }

  public findTransaction(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiServerUrl}/transaction/find/${id}`, {headers: this.headers});
  }

  public deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/transaction/delete/${id}`, {headers: this.headers});
  }

  public sendPrintRequest(printList: number[]): Observable<HttpResponse<Blob>> {
    const printHeader = new HttpHeaders({
      'ngrok-skip-browser-warning': '123', 
      'Content-Type': 'application/json', 
      'Authorization': '2Z0qSZdPytvF4rh1rCJe1yJ6HTK_44wS9aeRcGE1WE9WQJUYQ'
    });
    return this.http.post(`${this.apiServerUrl}/transaction/print`, printList, {
      responseType: 'blob',
      observe: 'response',
      headers: printHeader
    });
  }

  public getTestPrint(): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.apiServerUrl}/transaction/testPrint`, {
      responseType: 'blob',
      observe: 'response'
    });
  }
}
