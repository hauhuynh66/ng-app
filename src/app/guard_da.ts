import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export interface CanDeactivateComponent{
    canDeactivate: ()=> boolean | Observable<boolean>;
}

@Injectable()
export class DA_Guard implements CanDeactivate<CanDeactivateComponent>{
    canDeactivate(component: CanDeactivateComponent, currentRoute: ActivatedRouteSnapshot, 
        currentState: RouterStateSnapshot, nextState?: 
        RouterStateSnapshot | undefined): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return component.canDeactivate() ? true : confirm('You have unsaved changes. Do you really want to switch page?')
    }
}