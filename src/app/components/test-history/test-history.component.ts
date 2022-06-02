import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { cf,ms } from '../../../asset.loader'; 

@Component({
  selector: 'app-test-history',
  templateUrl: './test-history.component.html',
  styleUrls: ['./test-history.component.css', '../../global.style.css']
})
export class TestHistoryComponent implements OnInit {
  testname:string  = "";
  times:number = 0;
  timeArray:Array<number> = []
  constructor(private http:HttpClient, private route:ActivatedRoute, private router:Router) {
    this.route.params.subscribe((param:Params)=>this.testname = param["testname"]);
  }

  ngOnInit(): void {
    let options = {
      headers : new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("access_token")),
      params: {
        tn: this.testname
      }
    }
    this.http.get<number>(cf.url.main + "/api/exam/summary", options).subscribe({
      next: data=>{
        this.times = data;
        this.timeArray = Array.from([...Array(this.times + 1).keys()]);
        this.timeArray = this.timeArray.splice(1,this.times);
        console.log(this.timeArray);
        if(this.times<1){
          this.next();
        }
      }
    })
  }

  next(){
    this.router.navigate(["/test", this.testname]);
  }

  back(){
    this.router.navigate(["/exam"]);
  }

  view(i:number){
    this.router.navigate(["/result", this.testname, i]);
  }

}
