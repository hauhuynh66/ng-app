import { Component, OnInit } from '@angular/core';
import {newArray} from "@angular/compiler/src/util";

@Component({
  selector: 'app-notelist',
  templateUrl: './notelist.component.html',
  styleUrls: ['./notelist.component.css']
})
export class NotelistComponent implements OnInit {
  private notelist;
  constructor() {
    this.notelist = new Array(12);
  }

  ngOnInit(): void {
  }

}
