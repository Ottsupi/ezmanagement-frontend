import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public placeOrder(order: any): Observable<any> {
    let response = this.http.post(`${this.apiServerUrl}/transaction/order`, order);
    
    return response;
  }
}
