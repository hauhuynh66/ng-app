import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RotateIn, TrackingIn } from 'src/app/animation';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css', '../../global.style.css'],
  animations: [
    trigger('trackingIn', [
      transition(':enter', [useAnimation(TrackingIn, {
        params: {
          x: -0.5,
          length: 0.3
        }
      })])
    ]),
    trigger('test', [
      transition(':enter', [useAnimation(RotateIn, {
      params : {
        length: 1
      }
    })])
  ])]
})

export class PageNotFoundComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }

}
