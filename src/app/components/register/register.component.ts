import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','../../app.component.css']
})
export class RegisterComponent implements OnInit {
  username : string = "";
  password : string = "";
  hide: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
