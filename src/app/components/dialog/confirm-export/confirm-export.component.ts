import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import config from '../../../../assets/config.json';

@Component({
  selector: 'app-confirm-export',
  templateUrl: './confirm-export.component.html',
  styleUrls: ['./confirm-export.component.css']
})
export class ConfirmExportComponent implements OnInit { 
  startDate:FormControl = new FormControl(new Date());
  endDate:FormControl = new FormControl(new Date());
  type:string = "excel";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  export(){
    let options = {
      headers : new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token')),
      params: {
        "start" : this.startDate.value.toDateString(),
        "end" : this.endDate.value.toDateString(),
        "type" : "excel"
      },
      responseType : 'blob' as const
    }
    this.http.get(config.url.main + "/api/notes/export", options).subscribe({
      next: data =>{
        //this.download(data, 'text/csv');
        this.download(data, 'application/octet-stream');
      }
    })  
  }

  download(data:any, type:string){
    var blob:Blob|MediaSource;
    blob = new Blob([data], {type: type});
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.download = "export.xlsx";
    a.href = url;
    a.click();
  }
}
