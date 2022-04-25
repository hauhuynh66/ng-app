import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ng-app';
  sidenavState : boolean;
  constructor(){
    this.sidenavState = true;
  }

  ngOnInit(): void {
  }

}
