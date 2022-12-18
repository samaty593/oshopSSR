import { Product } from "./product";
import { ShoppingCartItem } from "./shopping-cart-item";

export interface Cart  {
    items: ShoppingCartItem[],
    count: number
}
