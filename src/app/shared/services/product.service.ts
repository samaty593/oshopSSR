import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  private apilink = '/.netlify/functions/link';

  creatProduct(product) {
    return this.http.post(this.apilink, product, { headers: { 'x-API': 'products' }} )
  }

  getOne(productId) {
    return this.http.get<Product>(this.apilink, { headers: { 'x-API': 'getOne' }, params: { 'id': productId } });
  }

  getAll() {
    return this.http.get<Product[]>('/.netlify/functions/getAll', { headers: { 'x-API': 'getList' }});
  }

  update(productId, product) {
    return this.http.put(this.apilink, product,  { headers: { 'x-API': 'updateOne' }, params: { 'id': productId } } )
  }

  delete(productId) {
    return this.http.delete(this.apilink, { headers: { 'x-API': 'deleteOne' }, params: { 'id': productId } }  )
  }
}
