import { Component } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$;

  constructor(private category: CategoryService
    ) {
      this.categories$ = category.getCategory()
      .pipe(map(res => {
        const name = [];
        for (const prop in res) {
          name.push(res[prop])
        };
        return name;
      }));
  }
}
