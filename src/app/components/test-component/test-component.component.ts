import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { cf, ms } from '../../../asset.loader';

interface Answer{
  answerId:number,
  en:string,
  content:string,
  selected:boolean
}

interface Question{
  questionId:number,
  content:string;
  possibleAnswers:Array<Answer>;
}

interface CurrentAnswer{
  qc:number;
  ac:string|number;
}

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css','../../global.style.css']
})

export class TestComponentComponent implements OnInit {
  questions:Array<Question> = []
  chooseAnswers:Array<CurrentAnswer> = []
  testname:string = "";
  characters:string = "ABCDEF";
  constructor(private http:HttpClient, private route:ActivatedRoute) {
    this.route.params.subscribe((param:Params)=>this.testname = param['testname']);
  }

  ngOnInit(): void {
    this.getQuestions();
  }

  choose(question:Question, answer:Answer){
    question.possibleAnswers.forEach(answer=>{
      answer.selected = false;
    })
    answer.selected = true;
  }

  getQuestions(){
    this.http.get<Array<Question>>(cf.url.main + "/api/exam/questions/"+ this.testname).subscribe({
      next: data=>{
        this.questions = data;
        this.questions.forEach(question=>{
          question.possibleAnswers.forEach(answer=>{
            answer.selected = false;
          })
        })
      },
      error: err=>{

      }
    })
  }

  submit(){
    this.chooseAnswers = [];
    this.chooseAnswers = this.questions.map((question)=>{
      let a = question.possibleAnswers.filter(answer => answer.selected===true).map(a => a.answerId)[0]
      return {
        qc: question.questionId,
        ac: a==null?0:a
      }
    });
    let data = {
      answerData: this.chooseAnswers,
      testName: this.testname
    }

    let options = {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("access_token"))
    }
    
    this.http.post(cf.url.main+"/api/exam/submit", data, options).subscribe({
      next: data=>{
        console.log(data);
      },
      error: err=>{
        console.log(err);
      }
    })
  }

}
