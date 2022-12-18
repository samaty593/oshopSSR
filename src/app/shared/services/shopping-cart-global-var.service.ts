import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from 'shared/models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartGlobalVarService {

  private shoppingCart$ = new BehaviorSubject<Cart>({items: [], count: 0});

  public setCart(cart) {
    this.shoppingCart$.next(cart);
  }

  public getLastCart(): Observable<Cart> {
    return this.shoppingCart$.asObservable();
  }}
