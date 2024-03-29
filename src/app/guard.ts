import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import jwt_decode from "jwt-decode";
import { Observable } from "rxjs";

@Injectable()
export class CAGuard implements CanActivate, CanActivateChild{

    constructor(private router:Router){

    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(route.url[0].path==='login'){
            return true;
        }
        let invalid:boolean = false;
        let token = localStorage.getItem("access_token");
        if(token!==null&&token!==""){
            let decoded:any = jwt_decode(token);
            if(new Date() > new Date(decoded.exp*1000)){
                invalid = true;
            }
        }else{
            invalid = true;
        }
        if(invalid){
            this.router.navigate(['/login']);
        }

        return true;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }


}