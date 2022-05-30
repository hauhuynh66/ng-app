import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ms} from '../../../../asset.loader';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css', '../../../global.style.css']
})

export class MessageDialogComponent implements OnInit {
  header:string = "";
  code:string = "";
  message:string="";
  type:string="error";
  constructor(@Inject(MAT_DIALOG_DATA) private data:any) {
    this.header = data.header;
    this.code = data.code;
    switch(this.code){
      case "LIMIT_ERR":
        this.message = ms.TEST_ERROR.LIMIT;
        break;
      default:
        this.message = ms.TEST_ERROR.OTHERS;
        break;
    }
  }

  ngOnInit(): void {
  }

}
