import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  apilink = '/.netlify/functions/login';
  constructor(private http: HttpClient) { 
  }

  API = 'sign-in';

  loginWithGoogle(body) {

    return this.http.post(this.apilink, body, { headers: { 'x-API': this.API } });
  }

}
