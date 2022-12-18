import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, lastValueFrom, Observable, of, switchMap, take } from 'rxjs';
import { Product } from 'shared/models/product';
import { Cart } from 'shared/models/shopping-cart';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {



  constructor(private http: HttpClient) { }

  private  create() {
    const cartdId$ = this.http.get<{insertedId: string}>('/.netlify/functions/carts');
    return  lastValueFrom(cartdId$);
  }

  public async getcart() {
    let cartId = await this.getOrCreateCartId();
    return this.http.get('/.netlify/functions/get-cart', { params: { 'id': cartId } }) as Observable<Cart>;
  }

  public async clearCart() {
    let cartId = await this.getOrCreateCartId()
    return this.http.delete('/.netlify/functions/clear-cart', { params: { 'id': cartId } }) as Observable<Cart>;
  }

  private getItem(cartId: string, product: Product, qty: number) {
    let body = { cartId: cartId, product: product, quantity: +qty};  // turn it into a number
    return this.http.post<{ value: { items: Product[] } }>('/.netlify/functions/add-to-cart', body)
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return Promise.resolve(cartId);

    const res  =  await this.create();
    cartId = res.insertedId
    localStorage.setItem('cartId', cartId);
    return cartId;
  }

  async addToCart(product: Product, qty: number) {
    let cartId = await this.getOrCreateCartId();
    const items$ = this.getItem(cartId, product, qty);
    return items$;
}

async incDec(item, value) {
    let cartId = await this.getOrCreateCartId();
    let body = {
      cartId: cartId,
      item: item,
      value: value
    }
    return this.http.post('/.netlify/functions/inc-dec-qty', body) as  Observable<Cart>;
}

}