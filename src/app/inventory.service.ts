import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from './inventory';
import { environment } from './environment/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllInventory(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.apiServerUrl}/inventory/all`);
  }

  public addInventory(inventory: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(`${this.apiServerUrl}/inventory/add`, inventory);
  }

  public findInventory(id: number): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.apiServerUrl}/inventory/find/${id}`);
  }

  public updateInventory(inventory: Inventory): Observable<Inventory> {
    return this.http.put<Inventory>(`${this.apiServerUrl}/inventory/update`, inventory);
  }

  public deleteInventory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/inventory/delete/${id}`);
  }
}
