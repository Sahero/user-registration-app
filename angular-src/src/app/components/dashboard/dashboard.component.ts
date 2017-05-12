import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  activities: Array<String> = [];
  currentPage: Number = 1;
  total: number ;//=100;
  maxSize:number;
  itemsPerPage: number = 5;

  constructor(private authservice: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getData(this.currentPage);
    this.authservice.getTotalActivities().subscribe(totalCount => {
      this.total = totalCount;
      this.maxSize = Math.floor(this.total/this.itemsPerPage) ;
      //console.log(totalCount);
      //console.log(Math.floor(this.maxSize));
      },
      err => {
        console.log(err);
        return false;
      });
    
  }

  getData(page: Number) {
    this.activities = [];
    this.authservice.getActivitiesByPage(page, this.itemsPerPage).subscribe(activities => {
      for (var i = 0; i < activities.length; i++) {
        this.activities.push(activities[i]);
      }
      this.currentPage = page;
    },
      err => {
        console.log(err);
        return false;
      });
  }


}
