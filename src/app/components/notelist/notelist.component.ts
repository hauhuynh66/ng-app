import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import config from "../../../assets/config.json";
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { CreatenoteComponent } from '../dialog/createnote/createnote.component';
import { PageEvent } from '@angular/material/paginator';
import { ConfirmUploadComponent } from '../dialog/confirm-upload/confirm-upload.component';
import { ConfirmExportComponent } from '../dialog/confirm-export/confirm-export.component';


@Component({
  selector: 'app-notelist',
  templateUrl: './notelist.component.html',
  styleUrls: ['./notelist.component.css', '../../global.style.css']
})

export class NotelistComponent implements OnInit {
  @ViewChild('file') fileRef:ElementRef = {} as ElementRef;
  notelist: any = [];
  date:FormControl = new FormControl(new Date());
  noteCount:number = 0;

  constructor(private http: HttpClient, private router:Router, public dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.getNotes(new Date().toDateString());
  }

  dropNote(event : CdkDragDrop<string[]>){
    moveItemInArray(this.notelist, event.previousIndex, event.currentIndex);
  }

  dateChange(event: MatDatepickerInputEvent<Date>){
    this.getNotes(this.date.value.toDateString());
  }

  getNotes(dateString:string, pageNumber?:number){
    let pn = {
      "date" : dateString,
      "page" : 0
    };

    let p = {
      "date" : dateString
    }

    let authorizationToken = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("access_token"));
    
    if(pageNumber!==undefined){
      pn.page = pageNumber
    }

    let countOptions = {
      headers : authorizationToken,
      params : p
    }

    this.http.get<number>(config.url.main + config.url.note.count, countOptions).subscribe({
      next: data=>{
        this.noteCount = data;
      },
      error: err=>{
        if(err.status===403){
          this.router.navigate(["/login"]);
        }
      }
    });

    let listOptions = {
      headers : authorizationToken,
      params : pn
    }

    this.http.get(config.url.main + config.url.note.list, listOptions).subscribe({
      next: data=>{
        this.notelist = data;
      },
      error: err=>{
        if(err.status===403){
          this.router.navigate(["/login"]);
        }
      }
    });
  }

  fileUpload(event:any){
    let file = event.target.files[0];
    let formData = new FormData();
    formData.append('file', file);

    let options = {
      headers : new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("access_token"))
    }

    if(file.name!==undefined){
      this.http.post(config.url.main + config.url.note.check, formData, options).subscribe({
        next : data =>{
          this.dialog.open(ConfirmUploadComponent, {
            width: '600px',
            data: data
          })
        },
        error : err =>{
          if(err.status === 403){
            this.router.navigate(["/login"])
          }
        }
      })
    }

    this.reset();
  }

  reset(){
    this.fileRef.nativeElement.value = '';
  }

  openNewDialog(){
    const dialogRef = this.dialog.open(CreatenoteComponent, {
      width : '600px'
    });
  }

  openExportConfirmDialog(){
    const dialogRef = this.dialog.open(ConfirmExportComponent,{
      width: '600px'
    })
  }

  pageChange(event: PageEvent){
    
  }

}