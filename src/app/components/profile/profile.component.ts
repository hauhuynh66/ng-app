import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  readonly url = "https://jsonplaceholder.typicode.com/users";
  users:any;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.users = this.http.get(this.url);
  }

}
