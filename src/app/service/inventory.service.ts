import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../model/inventory';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  apiServerUrl = environment.apiBaseUrl;
  public headers = new HttpHeaders({
    'ngrok-skip-browser-warning': '123', 
    'Content-Type': 'application/json', 
    'Authorization': '2Z0qSZdPytvF4rh1rCJe1yJ6HTK_44wS9aeRcGE1WE9WQJUYQ'
  });

  constructor(private http: HttpClient) { }
  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': '*' })
  };

  public getAllInventory(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.apiServerUrl}/inventory/all`, {headers: this.headers});
  }

  public addInventory(inventory: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(`${this.apiServerUrl}/inventory/add`, inventory, {headers: this.headers});
  }

  public findInventory(id: number): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.apiServerUrl}/inventory/find/${id}`, {headers: this.headers});
  }

  public updateInventory(inventory: Inventory): Observable<Inventory> {
    return this.http.put<Inventory>(`${this.apiServerUrl}/inventory/update`, inventory, {headers: this.headers});
  }

  public deleteInventory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/inventory/delete/${id}`, {headers: this.headers});
  }
}
