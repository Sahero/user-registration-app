import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserActivity } from '../../model/user-activity';
import { Page } from '../../model/page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  activities: Array<String> = [];
  //currentPage: Number = 1;
  //total: number;//=100;
  //maxSize: number;
  //itemsPerPage: number = 5;

  page = new Page();
  rows = new Array<UserActivity>();

  columns = [
    { name: 'Log' },
    { name: 'Timestamp' }
  ];

   customClasses = this.page.customClasses;

  constructor(private authservice: AuthService,
    private router: Router,
  ) {
    this.page.pageNumber = 0;
    this.page.size = 5;

    /*console.log("p="+this.currentPage);
    this.getData(this.currentPage);
    this.authservice.getTotalActivities().subscribe(totalCount => {
      this.total = totalCount;
      this.maxSize = Math.floor(this.total/this.itemsPerPage) ;
      console.log('total='+totalCount);
      console.log(Math.floor(this.maxSize));
      },
      err => {
        console.log(err);
        return false;
      });*/
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.authservice.getTotalActivities().subscribe(totalCount => {
      this.page.totalElements = totalCount;
      this.page.totalPages = this.page.totalElements / this.page.size;
      //console.log('total=' + this.page.totalElements); 
      //console.log(this.page.totalPages);
    },
      err => {
        console.log(err);
        return false;
      });
    this.authservice.getActivitiesByPage(this.page.pageNumber, this.page.size).subscribe(activities => {
      //console.log('acLen=' + activities.length);
      //console.log(activities);
      for (var i = 0; i < activities.length; i++) {
        this.activities.push(activities[i]);
      }
      this.rows = activities;
      //console.log(this.rows);
    },
      err => {
        console.log(err);
        return false;
      });
  }
  /*getData(page: Number) {
    this.activities = [];
    this.authservice.getActivitiesByPage(page, this.itemsPerPage).subscribe(activities => {
      console.log('acLen=' + activities.length);
      console.log(activities);
      for (var i = 0; i < activities.length; i++) {
        this.activities.push(activities[i]);
      }
      this.currentPage = page;
    },
      err => {
        console.log(err);
        return false;
      });
  }*/


}
