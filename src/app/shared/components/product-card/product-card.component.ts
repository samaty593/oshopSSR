import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCartGlobalVarService } from 'shared/services/shopping-cart-global-var.service';



@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent implements AfterViewInit{
  @Input('product') product: Product;
  @Input('showActions') showActions: boolean;
  quantity = 0;
  shoppingCart;
  constructor(private cartService: ShoppingCartService, private globalcart: ShoppingCartGlobalVarService) { 

  }

  async addToCart() {
     let res = await this.cartService.addToCart(this.product, this.quantity);
     res.pipe(take(1)).subscribe(item => { 
       this.globalcart.setCart(item.value)
     });
  }
ngAfterViewInit() {
  this.globalcart.getLastCart().subscribe(cart => {
    let p = cart.items.find(item => item.product._id == this.product._id);
    this.quantity = p ? p.quantity : 0;
  })
}
}
