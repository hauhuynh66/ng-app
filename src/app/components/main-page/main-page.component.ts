import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

interface Content{
  paragraph : String,
  link : String
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css', '../../global.style.css']
})

export class MainPageComponent implements OnInit {
  
  constructor(private http : HttpClient, private dialog: MatDialog) { 
    
  }

  ngOnInit(): void {
    
  }

}
