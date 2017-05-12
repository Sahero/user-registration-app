import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import {ValidateService} from  '../../services/validate.service';
import {AuthService} from  '../../services/auth.service';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
//import {MapsAPILoader} from '@agm/core';
import {MapsAPILoader} from 'angular2-google-maps/core';
import {IMyOptions, IMyDateModel} from 'ngx-mydatepicker';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
  
})

export class RegisterComponent implements OnInit {
  firstName: String;
  middleName: String;
  lastName: String;
  username: String;
  email: String;
  password: String;
  confirmPassword: String;
  birthdate: String;
  address: { streetAddress: String,
                  city: String,
                  state: String,
                  postalCode: String,
                  country: String,
                  latitude: Number,
                  longitude: Number
                };
                
  public latitude: number;
  public longitude: number;
  public addressFull: String;

  searchControl: FormControl;
  zoom: number;
  date = new Date();
  private myOptions: IMyOptions = {
        // other options...
        dateFormat: 'dd/mm/yyyy',
        disableSince: { year: this.date.getFullYear(),
                        month: this.date.getMonth() + 1,
                        day: this.date.getDate()},
        showTodayBtn: false,      

    };
  private dateModel: Object ;//= { date: { year: Number, month: Number, day: Number } };
  public genders = [
    { value: 'M', display: 'Male' },
    { value: 'F', display: 'Female' },
    { value: 'O', display: 'Other' }
  ];

  gender: String;
  captcha: boolean = false;
  @ViewChild("search")
  searchElementRef: ElementRef;

  siteKey: String= "6LeLGiAUAAAAAAhZvV2PwJNMoaEO4_Dp4glBr8Jl";
  
  constructor(private validateService: ValidateService, 
              private toastyService:ToastyService,
              private authService: AuthService,
              private router: Router,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone
              ) { }

  ngOnInit() {
    //set captcha 
    if(environment.production){
      this.siteKey = "6LdxGSEUAAAAAGOvcYqpnMTBDqw_6uRp0oiIZTgF";
    }
    //set google maps defaults
    this.zoom = 4;
    this.latitude; //= 39.8282;
    this.longitude; //= -98.5795;
    
    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          
          
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          this.addressFull = place.formatted_address;

          var componentForm = {
              premise: 'long_name',
              street_number: 'short_name',
              route: 'long_name',
              sublocality_level_1: 'long_name',
              locality: 'long_name',
              administrative_area_level_1: 'short_name',
              country: 'long_name',
              postal_code: 'short_name'
          };

          var mapping = {
              premise: 'BuildingName',
              street_number: 'StreetNumber',
              route: 'Street',
              sublocality_level_1: 'Suburb',
              locality: 'City',
              administrative_area_level_1: 'State',
              country: 'Country',
              postal_code: 'PostCode'
              //Region, District, Level
          };

        
       for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            
            if (componentForm[addressType]) {
              //console.log(addressType + '=addType');
              //console.log(componentForm[addressType]);
                var val = place.address_components[i][componentForm[addressType]];
                //location[mapping[addressType]] = val;
                mapping[addressType] = val;
                //console.log(val+' =val');
            }
        }

        this.address = {  
                    streetAddress : mapping.street_number+' '+mapping.route,
                    city: mapping.locality,
                    state: mapping.administrative_area_level_1,
                    postalCode: mapping.postal_code,
                    country: mapping.country,
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng()
        };
        
        });
      });
    });
    
    
  }

    onDateChanged(event: IMyDateModel): void {
        //console.log(this.birthdate);
        //console.log(event.formatted);
        this.birthdate= event.formatted;
       // console.log(this.birthdate);
    }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  onRegisterSubmit(){
    //console.log(123);
    const user = {
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      gender: this.gender,
      username: this.username,
      email: this.email, 
      password: this.password,
      birthdate: this.birthdate,
      address: this.address,
      admin: false
    }
    const confirmPassword = this.confirmPassword;
    console.log(user);
    
    //Required fields
    
    if(!this.validateService.validateRegister(user)){
      //this.toastyService.error('Please fill in all fields');
      
      this.toastyService.error({title:'Error', msg:'Please fill in all fields'});
      return false;
    }
    //Validate email
    if(!this.validateService.validateEmail(user.email)){
      this.toastyService.error({title:'Error', msg:'Please enter valid email address'});
      return false;
    }
    //Validate password
    if(!this.validateService.validatePassword(user.password, confirmPassword)){
      this.toastyService.error({title:'Error', msg:'Passwords do not match. Please try again!'});
      return false;
    }
    //Verify captcha
    if(!this.captcha){
      this.toastyService.error({title:'Error', msg:'Verification needed!'});
      return false;
    }
    //Register user
    this.authService.registerUser(user).subscribe(data => {
      //console.log(data.error);
      //console.log(data.msg);
        if(data.success){
          this.toastyService.success({title:'Registered', msg:'You are now registered. Please login!'});
          this.router.navigate(['/login']);
        }else{
          this.toastyService.error({title:'Error', msg:'Username or email id already exists! Please try again!'});
          this.router.navigate(['/register']);
        }
    });
   
  }

  resolved(captchaResponse: string) {
    //console.log(captchaResponse);
       if(captchaResponse!=null){
          this.captcha= true;
       }
       else{
         this.captcha= false;
       }

    }
}

