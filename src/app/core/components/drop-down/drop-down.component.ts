import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { SharedDataService } from 'shared/services/shared-data-service.service';


@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit {

  username: string;
  
  show:boolean = true;
  
  constructor(private shareService: SharedDataService) {
  }
  
  isAdmin$ = this.shareService.getData().pipe(map(user => user[2]));
  
  ngOnInit() {
    this.shareService.getData().subscribe(name => {
      this.username = name[0];
    });

  }

  

  showMenu() {
    this.show = !this.show;
  }
  
  logOut() {
    google.accounts.id.disableAutoSelect();
    this.shareService.setData(['', '/']);

    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('isAdmin');
  }
}
