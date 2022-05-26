import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { cf, ms } from '../../../asset.loader';

interface Answer{
  en:string,
  content:string
}

interface Question{
  content:string;
  possibleAnswers:Array<Answer>;
}

interface CurrentAnswer{
  qc:string;
  
}

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css','../../global.style.css']
})

export class TestComponentComponent implements OnInit {
  questions:Array<Question> = []
  chooseAnswers:Array<>
  testname:string = "";
  characters:string = "ABCDEF";
  constructor(private http:HttpClient, private route:ActivatedRoute) {
    this.route.params.subscribe((param:Params)=>this.testname = param['testname']);
  }

  ngOnInit(): void {
    this.getQuestions();
  }

  choose(answer:any){
    
  }

  getQuestions(){
    this.http.get<Array<Question>>(cf.url.main + "/api/exam/questions/"+ this.testname).subscribe({
      next: data=>{
        this.questions = data;
      },
      error: err=>{

      }
    })
  }

}
