import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RecieptService {
  apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllTransactions(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/transaction/all`);
  }
}
