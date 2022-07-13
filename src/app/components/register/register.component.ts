import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { CanDeactivateComponent } from 'src/app/guard_da';
import { cf } from '../../../asset.loader';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','../../app.component.css', '../../global.style.css']
})
export class RegisterComponent implements OnInit, CanDeactivateComponent {
  username : FormControl = new FormControl("");
  password : FormControl = new FormControl("");
  confirmPassword : FormControl = new FormControl("");
  firstname : FormControl = new FormControl("");
  lastname : FormControl = new FormControl("");
  email : FormControl = new FormControl("");
  validation : Array<Boolean> = Array(false, false, false);
  show : Array<Boolean> = Array(false, false, false);

  hideP: boolean = true;
  hideC: boolean = true;

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
  }

  @HostListener('window:beforeunload')
  canDeactivate () : boolean | Observable<boolean>{
    let da = this.firstname.value.length==0 && 
              this.lastname.value.length==0 &&
              this.username.value.length==0 &&
              this.email.value.length==0 &&
              this.password.value.length==0;
    return da;
  }

  checkUser(){
    let options = {
      params : {
        "username" : this.username.value
      },
    }
    this.http.get<Boolean>(cf.url.main + cf.url.user.check, options).subscribe({
      next : data=>{
        this.show[0] = true;
        this.validation[0] = data
      },
      error : error=>{
        this.show[0] = false;
        console.log(error)
      }
    })
  }

  confirmChange(){
    this.show[2] = true
    if(this.confirmPassword == this.password){
      this.validation[2] = true
    }else{
      this.validation[2] = false;
    }
  }

  passwordChange(){
    this.show[1] = true
    /*front-end validate goes here*/
    //pseudo
    if(this.password.value.length<5){
      this.validation[1] = false;
    }else{
      this.validation[1] = true;
    }
  }
}
