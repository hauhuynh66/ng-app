import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { NotelistComponent } from '../components/notelist/notelist.component';
import { ProfileComponent } from '../components/profile/profile.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'notelist', component: NotelistComponent},
    {path: 'profile', component: ProfileComponent}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule implements OnInit{
    name : string = "";

    constructor(private route: ActivatedRoute){}

    ngOnInit(): void {
        this.route.queryParams.subscribe(params=>{
            this.name = params['name'];
        })
    }
 }