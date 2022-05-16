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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  export(){
    let options = {
      headers : new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token')),
      params: {
        "start" : this.startDate.value.toDateString(),
        "end" : this.endDate.value.toDateString()
      }
    }
    this.http.get(config.url.main + "/api/notes/export", options).subscribe({
      next: data =>{
        
      }
    })  
  }
}
