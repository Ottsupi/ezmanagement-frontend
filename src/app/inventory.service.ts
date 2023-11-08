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
}
