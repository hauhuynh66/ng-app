import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../app.component.css']
})

export class LoginComponent implements OnInit {
  hide:boolean;
  username:string = "";
  password:string = "";
  url = "http://localhost:8400/login"

  constructor(private http: HttpClient) {
    this.hide = true;
  }

  ngOnInit(): void {

  }

  log(){
    console.log(this.username);
    console.log(this.password);
  }

  test(){
    let data = {
      username : 'hauhuynh66',
      password : 'Hauhuynh'
    }

    const options = {
      headers : new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      observable : 'response'
    }

    this.http.post<any>(this.url, data).subscribe( {
        next: res => {
          console.log(res);
        },
        error: e =>{
          console.log(e);
        }
      }
    );
  }
}
