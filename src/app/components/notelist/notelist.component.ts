import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { newArray } from "@angular/compiler/src/util";
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-notelist',
  templateUrl: './notelist.component.html',
  styleUrls: ['./notelist.component.css']
})

export class NotelistComponent implements OnInit {
  notelist: any
  private url = environment.requestUrl + "/api/notes";

  constructor(public dialog: MatDialog ) {
    this.notelist = new Array(3);
  }

  ngOnInit(): void {
  }

  openNewDialog(){
    
  }

}