import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import config from "../../../assets/config.json";
import { Router } from '@angular/router';

interface UserInfo{
  firstname : string,
  lastname : string,
  username : string,
  email : string,
  imgUrl : string,
  phoneNumber? : string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../global.style.css']
})

export class ProfileComponent implements OnInit {
  profile:UserInfo = {} as UserInfo;
  type:string = 'line';
  data:any;
  options:any;
  constructor(private http:HttpClient, private router:Router) {
    this.data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };
    
    this.options = {
      responsive: true,
      maintainAspectRatio: false
    };
  }

  ngOnInit(): void {
    if(localStorage.getItem("access_token")==null){
      this.router.navigate(["/login"]);
    }
    let options = {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("access_token"))
    }
    this.http.get<UserInfo>(config.url.main+config.url.user.profile, options).subscribe({
      next : data=>{
        this.profile = data;
      },
      error: err=>{
        if(err.status === 403){
          this.router.navigate(["/login"]);
        }
      }
    });
  }
}
