import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories$;
  id;
  product = {
    _id:'',
    title: '',
    price: null,
    category: '',
    imageUrl: '',
  }
  constructor(private category : CategoryService, private productService: ProductService, private route: ActivatedRoute, private router: Router) {
    this.categories$ = this.category.getCategory()
      .pipe(map(res => {
        const name = [];
        for (const prop in res) {
          name.push(res[prop])
        };
        return name;
      }));
    
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)  this.productService.getOne(this.id).pipe(take(1)).subscribe(p => this.product = p);
   }

   save(product) {
    if (this.id)  this.productService.update(this.id, product ).subscribe();
    else this.productService.creatProduct(product).subscribe();

    this.router.navigate(['/admin/products'])
  }

  delete() {
    if (!confirm('Are you sure you wanna delete this product?')) return;

    this.productService.delete(this.id).subscribe();
    this.router.navigate(['/admin/products'])
    }



}
