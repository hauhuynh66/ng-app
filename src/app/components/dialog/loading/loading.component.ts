import { transition, trigger, useAnimation } from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RotateInAnimation } from 'src/app/animation';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  animations: [
    trigger('move', [
      transition('false=>true',[
        useAnimation(RotateInAnimation, {
          params : {
            length: 1
          }
        })
      ])
    ])
  ]
})
export class LoadingComponent implements OnInit {

  public state = false
  constructor() { }

  ngOnInit(): void {
  }

  animationEnd(){
    this.state = !this.state
  }

}
