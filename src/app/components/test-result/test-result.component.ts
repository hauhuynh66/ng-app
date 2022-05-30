import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { cf } from '../../../asset.loader';

interface TestResult{
  question:string,
  answer:string,
  correct:boolean,
  point:number
}

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css', '../../global.style.css']
})
export class TestResultComponent implements OnInit {
  testname:string  = "";
  time:number = 0;
  testResult:Array<TestResult> = [];
  right:number = 0;
  total:number = 0;
  header:Array<string> = ["Question", "Answer", "Correct", "Point"];
  constructor(private http:HttpClient, private route:ActivatedRoute) {
    this.route.params.subscribe((param:Params)=>{
      this.testname = param["testname"];
      this.time = param["time"]
    });
  }

  ngOnInit(): void {
    this.get(this.time);
  }

  get(i:number){
    let options = {
      headers : new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("access_token")),
      params: {
        tn: this.testname,
        i: this.time
      }
    }
    this.http.get<Array<TestResult>>(cf.url.main + "/api/exam/result", options).subscribe({
      next: data=>{
        this.testResult = data;
        this.right = this.testResult.filter(data=>data.correct==true).length;
        this.total = this.testResult.filter(data=>data.point>0).reduce((s,x)=>s+x.point,0);
        console.log(this.total);
      },
      error: err=>{
        
      }
    });
  }

}
