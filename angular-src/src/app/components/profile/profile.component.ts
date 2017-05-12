import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: Object;

  constructor(private authservice: AuthService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.authservice.getProfile().subscribe(profile =>{
      //console.log(profile);
      this.user = profile;
      //console.log(this.user);
    },
    err => {
      console.log(err);
      return false;
    });
  }


}
