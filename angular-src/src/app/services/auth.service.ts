import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  isDev: boolean;
  activity: any;

  constructor(private http: Http) {
    this.isDev = !environment.production;
    console.log(this.isDev);
  }

  /* User */
  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users/register');
    return this.http.post(ep, user, { headers: headers })
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users/authenticate');
    return this.http.post(ep, user, { headers: headers })
      .map(res => res.json());
  }


  authenticateSocialUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users/socialAuthenticate');
    return this.http.post(ep, user, { headers: headers })
      .map(res => res.json());
  }

  getProfile(username) {
    //let params = new
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users/profile');
    return this.http.get(ep, { headers: headers ,params: {username: username}},)
      .map(res => res.json());
  }

  getAllUsers() {
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users/');
    return this.http.get(ep, { headers: headers })
      .map(res => res.json());
  }

  getTotalUsers() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users/getcount');
    return this.http.get(ep, { headers: headers })
      .map(res => res.json());
  }

  getUsersByPage(pageNumber,itemsPerPage) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    headers.append('pageNum', pageNumber);
    headers.append('itemsPerPage', itemsPerPage);
    let ep = this.prepEndpoint('users/getbypagenum');
    return this.http.get(ep, { headers: headers })
      .map(res => res.json());
  }
 
  storeUserData(token, user) {
    //console.log(user);
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getUserData(){
    if(this.loggedIn() && this.user==null){
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    return this.user ;
  }
  

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
    //console.log(localStorage.getItem('user'));
    //if(localStorage.getItem('id_token'))
    //console.log(localStorage);
    //console.log(tokenNotExpired('id_token'));
    /*var loginProvider = localStorage.getItem('_login_provider');
    //console.log(loginProvider);
    if(loginProvider == null){
      return tokenNotExpired('id_token');
    }
    else if(loginProvider.toLowerCase()==='facebook' || loginProvider.toLowerCase()==='google'){
      return true;
    }
    else{
      return false;
    }*/
    
  }

  logout() {
    this.addActivity({ userId: this.user.id, log: 'Successfully logged out.', status: 'success' }).subscribe(data => {

    });
    this.authToken = null;
    this.user = null;
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
    localStorage.clear();    
  }
  /**User end */

  /** Activity */
  addActivity(activity) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('activities/add');
    //console.log(activity);
    return this.http.post(ep, activity, { headers: headers })
      .map(res => res.json());
  }

  getTotalActivities() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('activities/getcount');
    return this.http.get(ep, { headers: headers })
      .map(res => res.json());
  }

  getActivitiesByPage(pageNumber, itemsPerPage) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    headers.append('pageNum', pageNumber);
    headers.append('itemsPerPage', itemsPerPage);
    let ep = this.prepEndpoint('activities/getbypagenum');
    return this.http.get(ep, { headers: headers })
      .map(res => res.json());
  }
  /** Activity end */
  prepEndpoint(ep) {
    
    if (!this.isDev) {
      return ep;
    } else {
      return 'http://localhost:8080/' + ep;
    }
  }

  // authenticateFB() {
  //   console.log('1');
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'multipart/form-data');
  //   headers.append('Access-Control-Allow-Origin', '*');
  //   let ep = this.prepEndpoint('auth/facebook');
  //   return this.http.get(ep, {headers: headers})
  //     .map(res => res.json());

  // }
}
