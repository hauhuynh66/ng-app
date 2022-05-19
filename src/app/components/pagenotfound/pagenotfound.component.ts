import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RotateInAnimation, TrackingInAnimation } from 'src/app/animation';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css', '../../global.style.css'],
  animations: [
    trigger('trackingIn', [
      transition(':enter', [useAnimation(TrackingInAnimation, {
        params: {
          x: -0.5,
          length: 0.3
        }
      })])
    ]),
    trigger('test', [
      transition(':enter', [useAnimation(RotateInAnimation, {
      params : {
        length: 1
      }
    })])
  ])]
})
export class PagenotfoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
