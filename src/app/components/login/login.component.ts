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
  username:string = "";
  password:string = "";
  constructor(private http: HttpClient, private router: Router) {
    
  }

  ngOnInit(): void {
    let options = {
      headers : new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("access_token"))
    }

    this.http.get(config.url.main + "/api/user/profile", options).subscribe({
      next: res => {
        console.log(res);
      },
      error : err => {
        
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
