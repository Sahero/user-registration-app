import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.firstName== undefined ||
      user.lastName== undefined ||
      user.gender== undefined ||
      user.username== undefined ||
      user.email == undefined||
      user.password == undefined ||
      user.birthdate== undefined  ||
      user.address== undefined)
      {
        return false;
      }
      else{
        return true;
      }
  }

  validatePassword(password, confirmPassword){
    if(password === confirmPassword){
      return true;
    }
    else{
      return false;
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email); 
  }
}
