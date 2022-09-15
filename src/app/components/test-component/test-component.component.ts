import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanDeactivateComponent } from 'src/app/guard_da';
import { cf } from '../../../asset.loader';
import { MessageDialogComponent } from '../dialog/message-dialog/message-dialog.component';

interface Answer{
  answerId:number,
  en:string,
  content:string,
  selected:boolean
}

interface Question{
  id:number,
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

export class TestComponentComponent implements OnInit, CanDeactivateComponent {
  limited:boolean = false;
  questions:Array<Question> = [];
  remainTime:number = 0;
  min:number = 0;
  chooseAnswers:Array<CurrentAnswer> = [];
  testname:string = "";
  characters:string = "ABCDEF";
  constructor(private http:HttpClient, 
    private route:ActivatedRoute, private router:Router, private dialog:MatDialog, private location:Location) {
    this.route.params.subscribe((param:Params)=>{
      this.testname = param['testname'];
    });
  }

  canDeactivate() : boolean | Observable<boolean>{
    return false;
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
    let options = {
      headers: new HttpHeaders().set("Authorization", "Bearer "+ localStorage.getItem("access_token"))
    }

    this.http.get<any>(cf.url.main + "/api/exam/questions/"+ this.testname, options).subscribe({
      next: data=>{
        if(data!=null){
          this.questions = data.questions;
          this.remainTime = data.remaining;
          this.min = Math.floor(this.remainTime/1000/60);
          this.questions.forEach(question=>{
            question.possibleAnswers.forEach(answer=>{
              answer.selected = false;
            })
          });
          setInterval(()=>{
            if(this.remainTime > 1000){
              this.remainTime -= 1000;
            }else{
              /**show out of time dialog */
            }
            this.min = Math.floor(this.remainTime/1000/60);
          }, 1000);
        }else{
          this.limited = true;
        }
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
        qc: question.id,
        ac: a==null?0:a
      }
    });
    let data = {
      answerData: this.chooseAnswers,
      testName: this.testname
    }

    let options = {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("access_token")),
      responseType: 'text' as const
    }
    
    this.http.post(cf.url.main + "/api/exam/submit", data, options).subscribe({
      next: ()=>{
        this.router.navigate(["/result", this.testname, 0]);
      },
      error: err=>{
        this.dialog.open(MessageDialogComponent,{
          width: '600px',
          data: {
            header: "Error"
          }
        })
      }
    })
  }
  
  back(){
    this.location.back();
  }
}
