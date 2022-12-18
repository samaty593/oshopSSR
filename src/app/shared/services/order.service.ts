import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

constructor(private http: HttpClient) { }

public storeOrder(order) {
  return this.http.post('/.netlify/functions/store-order', order) as  Observable<{insertedId: string}>
}
}
