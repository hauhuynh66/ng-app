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
import { ItemlistComponent } from './components/itemlist/itemlist.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { ErrorComponent } from './components/dialog/error/error.component';
import { ConfirmUploadComponent } from './components/dialog/confirm-upload/confirm-upload.component';
import { ConfirmExportComponent } from './components/dialog/confirm-export/confirm-export.component';

const routes: Routes = [
    {
        path: 'login', 
        component: LoginComponent,
        data: {animation : 'login'}
    },
    {
        path: 'register', 
        component: RegisterComponent,
        data: {animation : 'register'}
    },
    {
        path: 'notelist',
        component: NotelistComponent,
        data: {animation : 'notelist'}
    },
    {
        path: 'profile', 
        component: ProfileComponent,
        data: {animation : 'profile'}
    },
    {
        path: 'stats', 
        component: StatsComponent,
        data: {animation : 'stats'}
    },
    {
        path: 'misc', 
        component: MiscComponent,
        data: {animation : 'misc'}
    },
    {
        path: 'item', 
        component: ItemlistComponent,
        data: {animation : 'item'}
    },
    {
        path: 'history', 
        component: PurchaseComponent,
        data: {animation : 'history'}
    },
    {
        path: '**', 
        redirectTo: "/login"
    }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [
  
    ErrorComponent,
       ConfirmUploadComponent,
       ConfirmExportComponent
  ]
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
     CreatenoteComponent,
     ItemlistComponent,
     PurchaseComponent
 ];