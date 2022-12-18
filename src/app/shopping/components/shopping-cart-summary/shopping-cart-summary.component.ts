import { Component, Input } from '@angular/core';
import { Cart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent {
@Input('cart') cart: Cart;
@Input('totalPrice') totalPrice: number;
getTotalCost() {
  this.totalPrice = this.cart.items.map(item => item.quantity * item.product.price).reduce((acc, value) => acc + value, 0)
  return  this.totalPrice;
}
}
