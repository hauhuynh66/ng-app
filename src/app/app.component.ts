import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { filter, map, Observable, of } from 'rxjs';
import { Blur, RouteAnimations } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './global.style.css'],
  animations: [ 
    RouteAnimations ,
    trigger('sidenav', [
      transition('opened=>closed',[
        useAnimation(Blur, {
        params : {
          x : 4,
          length: 1
        }
        })
      ]),
      transition('closed=>opened',[
        useAnimation(Blur, {
        params : {
          x : 4,
          length: 1
        }
        })
      ])
    ])
  ]
})

export class AppComponent implements OnInit{
  @HostListener("window:toggle", ['$event']) toolbarToggle()
  {
    
  }

  title = 'My App';
  sidenavState : boolean;
  sidenavAnimationState : string = "opened";
  constructor(private router: Router){
    this.sidenavState = true;
  }

  loading$:Observable<boolean> = of(false);

  getRouterAnimation(outlet:RouterOutlet){
    return outlet.activatedRouteData["animation"];
  }

  ngOnInit(): void {
    this.loading$ = this.router.events.pipe(
      filter<any>(
        (e)=>
          e instanceof NavigationStart ||
          e instanceof NavigationEnd ||
          e instanceof NavigationCancel ||
          e instanceof NavigationError
      ), map((e)=>e instanceof NavigationStart)
    )
  }

  sidenav(){
    this.sidenavState = !this.sidenavState;
    switch(this.sidenavAnimationState){
      case "closed":
        this.sidenavAnimationState = "opened";
        break;
      case "opened":
        this.sidenavAnimationState = "closed";
        break;
    }
  }

}
