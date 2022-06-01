import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import config from "../../../assets/config.json";
import { filter, pairwise } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../global.style.css']
})

export class LoginComponent implements OnInit {
  hide:boolean = true;
  username:string = "hauhuynh66";
  password:string = "Hauhuynh";
  from:string = "";
  constructor(private http: HttpClient, private router: Router) {
    localStorage.setItem("access_token", "");
  }

  ngOnInit(): void {
    this.router.events.pipe(filter(e=>
      e instanceof RoutesRecognized
    ),pairwise()).subscribe((event : any[])=>{  
      if(event[1].url === "/login"){
        this.from = event[0].url;
      }else{
        this.from = "/profile";
      }
    });
  }

  authenticate(){
    let data = {
      'username' : this.username,
      'password' : this.password
    }

    this.http.post<any>(config.url.main + config.url.login, data, {observe: 'response'}).subscribe( {
        next: res => {
          let token = res.headers.get("x-token");
          if (token !== null){
            localStorage.setItem("access_token", token);
            this.router.navigate([this.from]);
          }
        },
        error: e =>{
          console.log(e);
        }
      }
    );
  }

  clear(){
    this.username = "";
    this.password = "";
  }
}
