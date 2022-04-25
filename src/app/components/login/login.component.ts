import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  readonly url = environment.requestUrl + "/login";
  hide:boolean;
  username:string = "";
  password:string = "";

  constructor(private http: HttpClient) {
    this.hide = true;
  }

  ngOnInit(): void {

  }

  log(){
    console.log(this.username);
    console.log(this.password);
  }
}
