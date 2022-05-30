import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { MessageDialogComponent } from './components/dialog/message-dialog/message-dialog.component';
import { ExamComponentComponent } from './components/exam-component/exam-component.component';
import { TestComponentComponent } from './components/test-component/test-component.component';
import { TestResultComponent } from './components/test-result/test-result.component';
import { TestHistoryComponent } from './components/test-history/test-history.component';
import { CAGuard } from './guard';

const routes: Routes = [
    {
        path: 'exam', 
        component: ExamComponentComponent,
        data: {animation : 'exam'},
        canActivate : [CAGuard]
    },
    {
        path: 'test/:testname', 
        component: TestComponentComponent,
        data: {animation : 'test'},
        canActivate : [CAGuard]
    },
    {
        path: 'summary/:testname', 
        component: TestHistoryComponent,
        data: {animation : 'summary'},
        canActivate : [CAGuard]
    },
    {
        path: 'result/:testname/:time',
        component: TestResultComponent,
        data: {animation : 'result'},
        canActivate : [CAGuard]
    }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CAGuard]
})

export class ExamRoutingModule implements OnInit{
    name : string = "";

    constructor(private route: ActivatedRoute){}

    ngOnInit(): void {
        this.route.queryParams.subscribe(params=>{
            this.name = params['name'];
        })
    }
 }

 export const ExamRoutingComponents = [
     ExamComponentComponent,
     TestComponentComponent,
     MessageDialogComponent,
     TestResultComponent,
     TestHistoryComponent
 ];