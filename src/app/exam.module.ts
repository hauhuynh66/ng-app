import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { ExamComponentComponent } from './components/exam-component/exam-component.component';
import { TestComponentComponent } from './components/test-component/test-component.component';

const routes: Routes = [
    {
        path: 'exam', 
        component: ExamComponentComponent,
        data: {animation : 'exam'}
    },
    {
        path: 'test/:testname', 
        component: TestComponentComponent,
        data: {animation : 'test'}
    }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
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
     TestComponentComponent
 ];