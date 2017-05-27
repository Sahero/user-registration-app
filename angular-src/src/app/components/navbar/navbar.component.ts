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
  
  constructor(private authService: AuthService,
    private router: Router,
    private toastyService: ToastyService) { }

  ngOnInit() {
 
  }

  onLogoutClick(){
    this.authService.logout();
    this.toastyService.info({ title: 'Logged out', msg: 'You are now logged out!' });
    this.router.navigate(['/']);
  }
}
