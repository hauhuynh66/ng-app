import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ms} from '../../../../asset.loader';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css', '../../../global.style.css']
})

export class MessageDialogComponent implements OnInit {
  @Output() value:EventEmitter<any> = new EventEmitter();
  inout:any;
  header:string = "";
  message:string="";
  type:string="error";
  constructor(@Inject(MAT_DIALOG_DATA) private data:any, private dialogRef:MatDialogRef<MessageDialogComponent>) {
    this.type = this.data.type;
    this.inout = this.data.extra;
    console.log(this.inout);
    if(this.type==="confirm"){
      this.dialogRef.disableClose = true;
    }
  }

  ngOnInit(): void {
    this.header = this.data.header;
    this.message = this.data.message;
  }

  confirm(){
    this.value.emit({
      value : true,
      extra: this.inout
    });
  }

}
