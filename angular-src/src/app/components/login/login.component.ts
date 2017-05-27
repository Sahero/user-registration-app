import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
//import { SocialAuthService } from "angular2-social-login";
import { SocialAuthService } from "../../services/social.auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username: String;
  password: String;
  public user;
  sub: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastyService: ToastyService,
    public socialAuthService: SocialAuthService
  ) { }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }
    //console.log(1);
    this.authService.authenticateUser(user).subscribe(data => {
      //console.log(new Date());
      if (data.success) {
        //console.log(data.user);
        this.authService.storeUserData(data.token, data.user);
        this.toastyService.success({ title: 'Login success', msg: 'You are now logged in!', timeout: 3000 });
        this.authService.addActivity({ userId: data.user.id, log: 'Successfully logged in.', status: 'success' }).subscribe(data => { });
        //console.log(new Date().toLocaleString());
        //console.log(data.user.id);
        this.router.navigate(['/dashboard']);
      }
      else {
        this.toastyService.error({ title: 'Login error', msg: data.msg, timeout: 3000 });
      }
    });

  }

  signIn(provider) {
    /*//this.authService.authenticateFB();

    this.authService.authenticateFB().subscribe(activities => {
      //console.log('acLen=' + activities.length);
      console.log(activities);
     
      //console.log(this.rows);
    },
      err => {
        console.log(err);
        return false;
      });*/
    if (provider === 'google') {
      this.toastyService.error({ title: 'Login using google', msg: "Coming Soon!", timeout: 5000 });
      return;
    }
    let d;

    this.socialAuthService.login(provider).subscribe(
      (data) => {
        //console.log(data);
        d = data;

        if (d.uid !== null) {
          var user = {
            id: d.uid,
            name: d.name,
            provider: d.provider,
            email: d.email,
            image: d.image,
            first_name: d.first_name,
            last_name: d.last_name,
            gender: d.gender
          }
         // console.log(user);

        this.authService.authenticateSocialUser(user).subscribe(data => {
          //console.log(data);
          if (data.success) {
            //console.log(data.user);
            this.authService.storeUserData(data.token, data.user);
            this.toastyService.success({ title: 'Login success using ' + provider, msg: 'You are now logged in using ' + provider + '!', timeout: 3000 });
            this.authService.addActivity({ userId: data.user.id, log: 'Successfully logged in using ' + provider + '.', status: 'success' }).subscribe(data => { });
            //console.log(new Date().toLocaleString());
            //console.log(data.user.id);
            this.router.navigate(['/dashboard']);

          }
          else {
            this.toastyService.error({ title: 'Login error', msg: data.msg, timeout: 3000 });
          }
        });
        }
      })
    //user data 
    //name, image, uid, provider, uid, email, token (returns tokenId for google, accessToken for Facebook, no token for linkedIn) 
    //   }
    // )

  }

  logout() {
    this.socialAuthService.logout().subscribe(
      (data) => {//return a boolean value.
        console.log('logout');
        console.log(data);
      }
    )
  }

}
