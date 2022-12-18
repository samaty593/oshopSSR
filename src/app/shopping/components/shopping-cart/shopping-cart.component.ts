import { Component, OnInit } from '@angular/core';
import { Cart } from 'shared/models/shopping-cart';
import { ShoppingCartGlobalVarService } from 'shared/services/shopping-cart-global-var.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  totalPrice;
  cart: Cart;
  displayedColumns: string[] = ['img','product','quantity', 'price'];

  constructor(
    private cartService: ShoppingCartService,
    private globalcart: ShoppingCartGlobalVarService
  ) { }

  async ngOnInit() {
    this.globalcart.getLastCart().subscribe(cart => this.cart = cart);
  }


  getTotalCost() {
     this.totalPrice = this.cart.items.map(item => item.quantity * item.product.price).reduce((acc, value) => acc + value, 0)
     return  this.totalPrice;
  }
  
  async clearCart() {
    let res = await this.cartService.clearCart();
    res.subscribe(cart => {
      this.cart = cart;
      this.globalcart.setCart(this.cart);
    });
  }


}
