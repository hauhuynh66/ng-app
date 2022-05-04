import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import config from "../../../assets/config.json";
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-notelist',
  templateUrl: './notelist.component.html',
  styleUrls: ['./notelist.component.css', '../../app.component.css']
})

export class NotelistComponent implements OnInit {
  notelist: any = [];
  date = new FormControl(new Date());

  constructor(private http: HttpClient, private router:Router) {
    
  }

  ngOnInit(): void {
    this.getRequest(new Date().toDateString());
  }

  dropNote(event : CdkDragDrop<string[]>){
    moveItemInArray(this.notelist, event.previousIndex, event.currentIndex);
  }

  dateChange(event: MatDatepickerInputEvent<Date>){
    //console.log(this.date.value)
    this.getRequest(this.date.value.toDateString());
  }

  getRequest(d:string){
    

    let options = {
      headers : new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("access_token")),
      params : {
        "date" : d
      }
    }

    this.http.get(config.url.main + config.url.note, options).subscribe({
      next: data=>{
        this.notelist = data;
      },
      error: err=>{
        this.router.navigate(["/login"]);
      }
    })
  }

}