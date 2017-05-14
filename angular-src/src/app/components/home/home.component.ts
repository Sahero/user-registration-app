import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserActivity } from '../../model/user-activity';
import { Page } from '../../model/page';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public users: Array<String> = [];
  // currentPage: Number = 1;
  // total: number;//=100;
  // maxSize: number;
  // itemsPerPage: number = 5;
  page = new Page();
  rows = new Array<UserActivity>();

  // columns = [
  //   { prop: 'firstName + lastName' },
  //   { name: 'Username' }
  // ];

  customClasses = this.page.customClasses;

  constructor(
    private authservice: AuthService,
    private router: Router
  ) {
    this.page.pageNumber = 0;
    this.page.size = 5;
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
    // if(this.authservice.loggedIn()){
    //   this.router.navigate(['/dashboard']);
    // }
    // this.getData(this.currentPage);
    // this.authservice.getTotalUsers().subscribe(totalCount => {
    //   this.total = totalCount;
    //   this.maxSize = Math.floor(this.total / this.itemsPerPage);
    //   //console.log(totalCount);
    //   //console.log(Math.floor(this.maxSize));
    // },
    //   err => {
    //     console.log(err);
    //     return false;
    //   });
    /*
        this.authservice.getAllUsers().subscribe(allUsers => {
          for (var i = 0; i < allUsers.length; i++) {
            this.users.push(allUsers[i]);
          }
        },
          err => {
            console.log(err);
            return false;
          });*/
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.authservice.getTotalUsers().subscribe(totalCount => {
      this.page.totalElements = totalCount;
      this.page.totalPages = this.page.totalElements / this.page.size;
      //console.log('total=' + this.page.totalElements); 
      //console.log(this.page.totalPages);
    },
      err => {
        console.log(err);
        return false;
      });
    this.authservice.getUsersByPage(this.page.pageNumber, this.page.size).subscribe(users => {
      
      for (var i = 0; i < users.length; i++) {
        this.users.push(users[i]);
      }
      this.rows = users;
      //console.log(this.rows);
    },
      err => {
        console.log(err);
        return false;
      });
  }
  /*
  getData(page: Number) {
    this.users = [];
    this.authservice.getUsersByPage(page, this.itemsPerPage).subscribe(users => {
      for (var i = 0; i < users.length; i++) {
        this.users.push(users[i]);
      }
      this.currentPage = page;
    },
      err => {
        console.log(err);
        return false;
      });
  }*/
  /*
    onClick(latitude, longitude) {
      //console.log(lat);
      let bodyCode = `<!DOCTYPE html>
  <html><head></head><body><div>
              <sebm-google-map [latitude]="`+ latitude + `" [longitude]="` + longitude + `" [scrollwheel]="false" [zoom]="12">
                  <sebm-google-map-marker [latitude]="`+ latitude + `" [longitude]="` + longitude + `"></sebm-google-map-marker>
                </sebm-google-map>
               </div></body></html> 
                `;
      console.log(bodyCode);
      this.modal.alert()
        .size('sm')
        .showClose(true)
        .title('Map')
        // .body(`<p>Google map with latitude: ` + latitude + `
        //         and longitude: `+ longitude + `
        //         </p>`)
        .body(bodyCode)
        //.bodyClass('sebm-google-map-container')
        .open();
    }
  */
}
