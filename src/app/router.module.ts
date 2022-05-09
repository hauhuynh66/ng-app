import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotelistComponent } from './components/notelist/notelist.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StatsComponent } from './components/stats/stats.component';
import { RegisterComponent } from './components/register/register.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { MiscComponent } from './components/misc/misc.component';
import { CreatenoteComponent } from './components/dialog/createnote/createnote.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'notelist', component: NotelistComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'stats', component: StatsComponent},
    {path: 'misc', component: MiscComponent},
    {path: '**', redirectTo: "/login"}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class BasicRoutingModule implements OnInit{
    name : string = "";

    constructor(private route: ActivatedRoute){}

    ngOnInit(): void {
        this.route.queryParams.subscribe(params=>{
            this.name = params['name'];
        })
    }
 }

 export const BasicRoutingComponents = [
     LoginComponent,
     NotelistComponent,
     ProfileComponent,
     RegisterComponent,
     StatsComponent,
     MiscComponent,
     PagenotfoundComponent,
     CreatenoteComponent
 ];