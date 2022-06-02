import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {cf, ms} from '../../../asset.loader';

@Component({
  selector: 'app-exam-component',
  templateUrl: './exam-component.component.html',
  styleUrls: ['./exam-component.component.css', '../../global.style.css']
})
export class ExamComponentComponent implements OnInit {
  test:Array<String> = [];
  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.get();
  }

  get(){
    let options = {
      headers: new HttpHeaders().set("Authorization", "Bearer "+ localStorage.getItem("access_token"))
    }
    this.http.get<Array<any>>(cf.url.main + "/api/exam/tests", options).subscribe({
      next: data=>{
        this.test = data.map(d=>d.name);
      }
    })
  }

  goToExam(testname:any){
    this.router.navigate(["/summary", testname]);
  }
}
