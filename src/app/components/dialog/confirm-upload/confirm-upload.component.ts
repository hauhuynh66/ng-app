import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-upload',
  templateUrl: './confirm-upload.component.html',
  styleUrls: ['./confirm-upload.component.css']
})

export class ConfirmUploadComponent implements OnInit {
  cols = ['no', 'description', 'row', 'col'];
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { 
    let i = 1;
    this.data.forEach((e:any) => {
      e.no = i;
      i++;
    });
  }

  ngOnInit(): void {
    console.log(this.data);
  }

}
