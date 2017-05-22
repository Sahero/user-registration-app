import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: Object;

  constructor(private authservice: AuthService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.authservice.getProfile(this.route.snapshot.params['username']).subscribe(profile =>{
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
