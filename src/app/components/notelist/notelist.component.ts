import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { cf, ms} from "../../../asset.loader";
import { Router } from '@angular/router';
import { CdkDragDrop, CdkDragEnter, moveItemInArray } from "@angular/cdk/drag-drop";
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { CreatenoteComponent, Note } from '../dialog/createnote/createnote.component';
import { PageEvent } from '@angular/material/paginator';
import { ConfirmUploadComponent } from '../dialog/confirm-upload/confirm-upload.component';
import { ConfirmExportComponent } from '../dialog/confirm-export/confirm-export.component';
import { MessageDialogComponent } from '../dialog/message-dialog/message-dialog.component';

interface NoteListData{
  data:Array<Note>;
  count:number;
}

@Component({
  selector: 'app-notelist',
  templateUrl: './notelist.component.html',
  styleUrls: ['./notelist.component.css', '../../global.style.css']
})

export class NotelistComponent implements OnInit {
  @ViewChild('file') fileRef:ElementRef = {} as ElementRef;
  notelist:NoteListData = {
    data: [],
    count: 0
  };
  date:FormControl = new FormControl(new Date());
  token = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("access_token"));

  constructor(private http: HttpClient, private router:Router, public dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.getNotes(new Date().toDateString());
  }

  dropNote(event : CdkDragDrop<NoteListData>){
    moveItemInArray(this.notelist.data, event.previousIndex, event.currentIndex);
  }

  deleteNote(event : CdkDragDrop<NoteListData>){
    if(event.previousContainer===event.container){

    }else{
      let dialogRef = this.dialog.open(MessageDialogComponent,{
        width: '600px',
        data: {
          header: "Delete",
          message: "Are you sure you want to delete this note?",
          type: "confirm",
          extra: this.notelist.data[event.currentIndex].id
        }
      });

      dialogRef.componentInstance.value.subscribe(value=>{
        let confirm = value.value;
        let id = value.extra;
        console.log(confirm);

        let options = {
          headers: new HttpHeaders().set("Authorization", "Bearer "+ localStorage.getItem("access_token")),
          params: {
            id: id
          },
          responseType: 'text' as const
        }

        if(confirm == true){
          this.http.get(cf.url.main + "/api/notes/delete",options).subscribe({
            next: data=>{
              console.log(data);
              if(data==="OK"){
                this.notelist.data = this.notelist.data.filter((c)=>c.id! != id)
              }
            }
          })
        }
      })
      
    }
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
    
    if(pageNumber!==undefined){
      pn.page = pageNumber
    }

    let listOptions = {
      headers : this.token,
      params : pn
    }

    this.http.get<NoteListData>(cf.url.main + cf.url.note.list, listOptions).subscribe({
      next: data=>{
        this.notelist = data;
        console.log(data);
      },
      error: err=>{
        /*insert error handler here

        */
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
      headers : this.token
    }

    if(file.name!==undefined){
      this.http.post(cf.url.main + cf.url.note.check, formData, options).subscribe({
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
    let dialogRef = this.dialog.open(CreatenoteComponent, {
      width : '600px'
    });
    dialogRef.componentInstance.note.subscribe(data=>{
      let options = {
        headers: this.token
      }
      this.http.post(cf.url.main + cf.url.note.add, data, options).subscribe({
        next: () => {
          this.notelist.data.push(data);
        },
        error: err=>{
          /*insert error handler here

          */
          console.log(err);
        }
      })
    })
  }

  openExportConfirmDialog(){
    const dialogRef = this.dialog.open(ConfirmExportComponent,{
      width: '600px'
    })
  }

  pageChange(event: PageEvent){
    
  }

  test(e:DragEvent){
    
  }

}