import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('file') fileRef:ElementRef = {} as ElementRef;
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
    this.getRequest(this.date.value.toDateString());
  }

  getRequest(d:string){
    let options = {
      headers : new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("access_token")),
      params : {
        "date" : d
      }
    }

    this.http.get(config.url.main + config.url.note.list, options).subscribe({
      next: data=>{
        this.notelist = data;
      },
      error: err=>{
        this.router.navigate(["/login"]);
      }
    })
  }

  fileUpload(event:any){
    let file = event.target.files[0];
    let formData = new FormData();
    formData.append('csv', file);

    let options = {
      headers : new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("access_token"))
    }

    if(file.name!==undefined){
      this.http.post(config.url.main + config.url.note.check, formData, options).subscribe({
        next : data =>{
          console.log(data);
        },
        error : err =>{
          console.log(err.message);
        }
      })
    }

    this.reset();
  }

  reset(){
    this.fileRef.nativeElement.value = '';
  }

}