import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  id: string;
  user: any;
  
  constructor(private authService: AuthService,
    private router: Router,
    private toastyService: ToastyService) { }

  ngOnInit() {
    //this.id = this.authService.user.userId;
    this.user = this.authService.getUserData();
    //console.log(this.user);
  }

  onLogoutClick(){
    // var user;
    // if(this.authService.user==null){
    //   user = JSON.parse(localStorage.getItem("user"));
    // }
    // else{
    //   user = this.authService.user; 
    // }
    
    //console.log(user);
    //console.log(user.id);
    //console.log(localStorage.getItem("user"));
    //console.log(JSON.parse(localStorage.getItem("user")));
    localStorage.clear();
    this.authService.addActivity({ userId: this.user.id, log: 'Successfully logged out.', status: 'success' }).subscribe(data => {

    });
    // this.authService.logout();
    this.toastyService.success({ title: 'Logged out', msg: 'You are now logged out!' });
    this.router.navigate(['/login']);
  }
}
