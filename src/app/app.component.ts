import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { filter, map, Observable, of } from 'rxjs';
import { RouteAnimations } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ RouteAnimations ]
})
export class AppComponent implements OnInit{
  title = 'My App';
  sidenavState : boolean;
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

}
