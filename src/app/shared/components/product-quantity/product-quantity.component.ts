import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'shared/models/shopping-cart';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';
import { ShoppingCartGlobalVarService } from 'shared/services/shopping-cart-global-var.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('item') item: ShoppingCartItem;


  constructor(
    private cartService: ShoppingCartService,
    private globalCart: ShoppingCartGlobalVarService,
  ) { }

  async incDec(item: ShoppingCartItem, value) {
    let cart$ = await this.cartService.incDec(this.item, value);
    cart$.subscribe( cart => {
      this.globalCart.setCart(cart);
    });
  }


}
