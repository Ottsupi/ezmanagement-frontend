import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiServerUrl = environment.apiBaseUrl;
  public headers = new HttpHeaders({
    'ngrok-skip-browser-warning': '123', 
    'Content-Type': 'application/json', 
    'Authorization': '2Z0qSZdPytvF4rh1rCJe1yJ6HTK_44wS9aeRcGE1WE9WQJUYQ'
  });

  constructor(private http: HttpClient) { }

  public placeOrder(order: any): Observable<boolean> {
    let response = this.http.post<boolean>(`${this.apiServerUrl}/transaction/order`, order, {headers: this.headers});
    
    return response;
  }

  public checkInv(order: any): Observable<any> {
    let response = this.http.post(`${this.apiServerUrl}/transaction/checkInv`, order, {responseType: 'text'});
    
    return response;
  }
}
