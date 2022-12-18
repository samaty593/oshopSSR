import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs';
import { SharedDataService } from 'shared/services/shared-data-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGardService implements CanActivate {

  constructor(private shareService: SharedDataService, private router: Router) {}
    
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
       return this.shareService.getData().pipe(map(user => {
        if (user[0]) return true;
        
        this.router.navigate(['/login'], { queryParams: { returnurl: state.url }})
          console.log('bad route: '+ state.url)
        return false;
      }));
   };

  }