import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-text-input-dialog',
  templateUrl: './text-input-dialog.component.html',
  styleUrls: ['./text-input-dialog.component.css']
})
export class TextInputDialogComponent implements OnInit,OnDestroy {
  text:FormControl = new FormControl('');
  type:string = 'TEXT';
  format:string = '';
  @Output() changedData:EventEmitter<any> = new EventEmitter();
  constructor(@Inject(MAT_DIALOG_DATA) private data:any) { 
    this.type = this.data.type;
    if(this.type==='DATE'){
      this.text.setValue(new Date(this.data.data));
    }else{
      this.text.setValue(this.data.data);
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if(this.type!='DATE'){
      this.changedData.emit(this.text.value);
    }
  }

  close(){
    if(this.type!='DATE'){
      this.changedData.emit(this.text.value);
    }
  }

}
