import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotelistComponent } from './components/notelist/notelist.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { MiscComponent } from './components/misc/misc.component';
import { CreatenoteComponent } from './components/dialog/createnote/createnote.component';
import { ItemlistComponent } from './components/itemlist/itemlist.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { ConfirmUploadComponent } from './components/dialog/confirm-upload/confirm-upload.component';
import { ConfirmExportComponent } from './components/dialog/confirm-export/confirm-export.component';
import { PurchaseDialogComponent } from './components/dialog/purchase-dialog/purchase-dialog.component';
import { MessageDialogComponent } from './components/dialog/message-dialog/message-dialog.component';
import { ExcelEditorComponent } from './components/excel-editor/excel-editor.component';
import { TextInputDialogComponent } from './components/dialog/text-input-dialog/text-input-dialog.component';
import { MainPageComponent } from './components/main-page/main-page.component';

import { CAGuard } from './guard';
import { DA_Guard } from './guard_da';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
    {
        path: '',
        component: MainPageComponent,
        data: {animation : 'mainpage'}
    },
    {
        path: 'login', 
        component: LoginComponent,
        data: {animation : 'login'}
    },
    {
        path: 'register', 
        component: RegisterComponent,
        data: {animation : 'register'},
        canDeactivate : [DA_Guard]
    },
    {
        path: 'notelist',
        component: NotelistComponent,
        data: {animation : 'notelist'},
        canActivate : [CAGuard]
    },
    {
        path: 'profile', 
        component: ProfileComponent,
        data: {animation : 'profile'},
        canActivate : [CAGuard]
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
        path: 'edit', 
        component: ExcelEditorComponent,
        data: {animation : 'edit'}
    },
    {
        path: 'logout',
        component: LoginComponent,
        data: {animation : 'logout'}
    },
    {
        path : 'item/:name',
        component : ItemDetailComponent,
        data: {animation : 'item-detail'}
    },
    {
        path : 'map',
        component : MapComponent,
        data: {animation : 'map'}
    },
    {
        path: '404',
        component: PagenotfoundComponent
    },
    {
        path: '**', 
        redirectTo: "/404"
    }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CAGuard]
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
     MiscComponent,
     PagenotfoundComponent,
     CreatenoteComponent,
     ItemlistComponent,
     PurchaseComponent,
     ConfirmUploadComponent,
     ConfirmExportComponent,
     PurchaseDialogComponent,
     MessageDialogComponent,
     TextInputDialogComponent,
     ExcelEditorComponent,
     MainPageComponent
 ];