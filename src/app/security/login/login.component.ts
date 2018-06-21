import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {SecurityService} from '../security.service';
import {AuthClient} from '../authClient';
import {AuthTokens} from '../authTokens';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private errorMessage: string;
  user: User;
  private authClient: AuthClient;
  private authToken: AuthTokens;

  constructor(private securityService: SecurityService, private router: Router) {
    this.user = <User>{};
    this.authToken = <AuthTokens>{};

    this.authClient = <AuthClient>{};

    this.authClient.client_id = 'write-client';
    this.authClient.grant_type = 'password';
    this.authClient.username = 'admin';
    this.authClient.password = 'admin123';
  }

  ngOnInit() {
    this.user.username='write-client';
    this.user.password='write-client-password123';

  }

  onSubmit(user: User){
    this.securityService.getAuthTokens(user, this.authClient).subscribe(
      new_token => {
        this.authToken = new_token;
        console.log(' - AuthToken -');
        console.log(this.authToken);
        this.securityService.saveToken(this.authToken);
      },
      error => this.errorMessage = <any>error
    );
  }

  gotoMain() {
    this.router.navigate(['/']);
  }

}
