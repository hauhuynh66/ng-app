import { transition, trigger, useAnimation } from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RotateIn } from 'src/app/animation';

interface LoadingItem
{
  pos : number,
  animationState : string
}

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  animations: [
    trigger('move', [
      transition('iddle => start',[
        useAnimation(RotateIn, {
          params : {
            length: 0.5
          }
        })
      ])
    ])
  ]
})

export class LoadingComponent implements OnInit {
  private n = 7
  public items : LoadingItem[] = []
  private currentPos : number = 0;
  constructor() { }

  ngOnInit(): void {
    Array.from(Array(this.n).keys()).forEach(i => {
      this.items.push({
          pos : i,
          animationState : 'iddle'
      })
    });

    setInterval(()=>{
      this.items[this.currentPos].animationState = 'start';
    }, 500);
    
  }

  animationEnd(e : any){
    if(e.animationState == 'start')
    {
      this.items[this.currentPos].animationState = 'iddle'
      if(this.currentPos < 6)
      {
        this.currentPos += 1
      }else{
        this.currentPos = 0
      }
    }
  }

}
