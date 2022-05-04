import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';
import { Router } from '@angular/router';
import config from "../../../assets/config.json";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../app.component.css']
})

export class LoginComponent implements OnInit {
  hide:boolean = true;
  username:string = "hauhuynh66";
  password:string = "Hauhuynh";
  constructor(private http: HttpClient, private router: Router) {
    
  }

  ngOnInit(): void {
    
  }

  authenticate(){
    let data = {
      'username' : this.username,
      'password' : this.password
    }

    this.http.post<any>(config.url.main + config.url.login, data, {observe: 'response'}).subscribe( {
        next: res => {
          let token = res.headers.get("x-token");
          if (token != null){
            localStorage.setItem("access_token", token);
            this.router.navigate(['/profile']);
          }
          
        },
        error: e =>{
          console.log(e);
        }
      }
    );
  }
}
