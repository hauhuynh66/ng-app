import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import config from "../../../assets/config.json";
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from '../dialog/loading/loading.component';
import { throwError, timeout } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../global.style.css']
})

export class LoginComponent implements OnInit {
  hide : boolean = true;
  username : string = "hauhuynh66";
  password : string = "Hauhuynh";
  constructor(private http: HttpClient, private router: Router, private dialog : MatDialog) {
  }

  ngOnInit(): void {
    
  }

  authenticate(){
    let dialogRef = this.dialog.open(LoadingComponent, {
      width : '500px',
      height : '300px',
      disableClose : true
    })

    let data = {
      'username' : this.username,
      'password' : this.password
    }

    this.http.post<any>(config.url.main + config.url.login, data, {observe: 'response'}).subscribe( {
        next: res => {
          let token = res.headers.get("x-token");
          if (token !== null){
            localStorage.setItem("access_token", token);
            dialogRef.close()
            this.router.navigate(["/profile"]);
          }
        },
        error: e =>{
          dialogRef.close();
        }
      }
    );
  }

  clear(){
    this.username = "";
    this.password = "";
  }
}
