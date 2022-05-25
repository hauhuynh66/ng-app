import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createnote',
  templateUrl: './createnote.component.html',
  styleUrls: ['./createnote.component.css']
})
export class CreatenoteComponent implements OnInit {
  title:FormControl = new FormControl('');
  displayDate:FormControl = new FormControl(new Date())
  content:FormControl = new FormControl('');
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  addNote(){
    
  }

}
