import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  constructor(private route: ActivatedRoute) {}

  private userId?: string = localStorage.getItem('userId') ?? ''
  private username: string = localStorage.getItem('name') ?? '';
  private returnUrl?: string;
  private isAdmin?: Boolean = localStorage.getItem('isAdmin') == 'true' ? true : false ;

  private userName$ = new BehaviorSubject([this.username, this.returnUrl, this.isAdmin, this.userId] );


  public setData(data) {
    this.userName$.next(data);
  }

  public getData(): Observable<any[]>{
    return this.userName$.asObservable();
} 

}