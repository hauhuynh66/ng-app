import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-text-input-dialog',
  templateUrl: './text-input-dialog.component.html',
  styleUrls: ['./text-input-dialog.component.css']
})
export class TextInputDialogComponent implements OnInit {
  text:FormControl = new FormControl('');
  type:string = 'TEXT';
  constructor(@Inject(MAT_DIALOG_DATA) private data:any) { 
    this.type = this.data.type;
    this.text.setValue(this.data.data);
  }

  ngOnInit(): void {
  }

}
