import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CredentialResponse, GsiButtonConfiguration } from 'google-one-tap';
import { GoogleAuthService } from 'shared/services/google-auth.service';
import { SharedDataService } from 'shared/services/shared-data-service.service';

// import * as google from 'google-one-tap';
declare global {
  const google: typeof import('google-one-tap');
}

// declare var google:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private googleauth: GoogleAuthService, 
    private shareService: SharedDataService, 
    private route: ActivatedRoute){
  }

  username: string ='';

 ngOnInit() {
    google.accounts.id.initialize({
      client_id: "57773733312-ciqg1igatai97ec88k8qj4d1mr4avu7e.apps.googleusercontent.com",
      callback: this.handleCredentialResponse.bind(this),
    });
  
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { 
        theme: "outline",
        size: "large", 
        type: "standard", 
        text: "signin_with" , 
        shape: "pill", 
        width: 100 
      } as GsiButtonConfiguration
    ) ;
  
    google.accounts.id.prompt();
  }




    handleCredentialResponse(response: CredentialResponse) {


      this.googleauth.loginWithGoogle(response.credential) // store returnUrl on loclaStorge(cf loginWithGoogle service)
      .subscribe({
          next: (res: { token: string; mailId: string; name: string; isAdmin: string, userId: string}) => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('name', res.name);
            localStorage.setItem('isAdmin', res.isAdmin);
            localStorage.setItem('userId', res.userId);
            let returnurl = this.route.snapshot.queryParamMap.get('returnurl') || '/';
            let isAdmin = res.isAdmin
            this.shareService.setData([res.name, returnurl, isAdmin]);    
          },
          error: (error: any) => console.error(error)
       });
     
  }

}
