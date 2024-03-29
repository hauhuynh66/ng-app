import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotelistComponent } from './components/notelist/notelist.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent} from './components/pagenotfound/pagenotfound.component';
import { MiscComponent } from './components/misc/misc.component';
import { CreatenoteComponent } from './components/dialog/createnote/createnote.component';
import { ItemlistComponent } from './components/itemlist/itemlist.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { ConfirmUploadComponent } from './components/dialog/confirm-upload/confirm-upload.component';
import { ConfirmExportComponent } from './components/dialog/confirm-export/confirm-export.component';
import { PurchaseDialogComponent } from './components/dialog/purchase-dialog/purchase-dialog.component';
import { MessageDialogComponent } from './components/dialog/message-dialog/message-dialog.component';
import { TextInputDialogComponent } from './components/dialog/text-input-dialog/text-input-dialog.component';
import { MainPageComponent } from './components/main-page/main-page.component';

import { CAGuard } from './guard';
import { DA_Guard } from './guard_da';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { MapComponent } from './components/map/map.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { ImportDataComponent } from './components/import-data/import-data.component';
import { FnxComponent } from './components/fnx/fnx.component';
import { OfficeProcessesComponent } from './components/officeprocs/officeprocs.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { GaugeComponent } from './components/gauge/gauge.component';
import { OvalComponent } from './components/oval/oval.component';
import { LoadingComponent } from './components/dialog/loading/loading.component';

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
        path : 'upload',
        component : ImportDataComponent,
        data : {animation : 'upload'}
    },
    {
        path : 'test',
        component : ViewerComponent,
        data: {animation : 'test'}
    },
    {
        path : 'edit',
        component : OfficeProcessesComponent,
        data: {animation : 'office'}
    },
    {
        path : 'fnx',
        component : FnxComponent,
        data : {animation : 'fnx'}
    },
    {
        path: '404',
        component: PageNotFoundComponent
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
     PageNotFoundComponent,
     CreatenoteComponent,
     ItemlistComponent,
     PurchaseComponent,
     ConfirmUploadComponent,
     ConfirmExportComponent,
     PurchaseDialogComponent,
     MessageDialogComponent,
     TextInputDialogComponent,
     MainPageComponent,
     ItemDetailComponent,
     ViewerComponent,
     ImportDataComponent,
     OfficeProcessesComponent,
     FnxComponent,
     CalendarComponent,
     GaugeComponent,
     OvalComponent,
     LoadingComponent
 ];