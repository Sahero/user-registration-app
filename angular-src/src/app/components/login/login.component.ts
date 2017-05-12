import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username: String;
  password: String;


  constructor(
    private authService: AuthService,
    private router: Router,
    private toastyService: ToastyService
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
        this.authService.storeUserData(data.token, data.user);
        this.toastyService.success({ title: 'Login success', msg: 'You are now logged in!', timeout: 3000 });
        this.authService.addActivity({userId: data.user.id, log: 'Successfully logged in.', status:'success'}).subscribe(data => {});
        //console.log(new Date().toLocaleString());
        //console.log(data.user.id);
        this.router.navigate(['/dashboard']);
      }
      else {
        this.toastyService.error({ title: 'Login error', msg: data.msg, timeout: 3000 });
      }
    });

  }
}
