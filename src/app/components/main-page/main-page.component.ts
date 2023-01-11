import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { from, Observable, of } from 'rxjs';
import { cf, ms } from '../../../asset.loader';
import { LoadingComponent } from '../dialog/loading/loading.component'; 

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
  //main message
  public message:string = "GENERIC MESSAGE";
  constructor(private http : HttpClient, private dlg: MatDialog) { 
    
  }

  ngOnInit(): void {


  }

}
