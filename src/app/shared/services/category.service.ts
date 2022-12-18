import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  private apilink = '/.netlify/functions/link';
  API = 'category';

  getCategory() {
    return  this.http.get(this.apilink, { headers: { 'x-API': this.API } })
  }
}
