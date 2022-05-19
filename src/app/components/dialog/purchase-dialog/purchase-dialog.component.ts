import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemData } from '../../itemlist/itemlist.component';
import config from '../../../../assets/config.json';

interface PurchaseRequest{
  name:string;
  address:string;
  phone:string;
  items:Array<ItemData>;
}

@Component({
  selector: 'app-purchase-dialog',
  templateUrl: './purchase-dialog.component.html',
  styleUrls: ['./purchase-dialog.component.css']
})

export class PurchaseDialogComponent implements OnInit {
  userControl:FormGroup = this.formBuilder.group({});
  infoControl:FormGroup = this.formBuilder.group({});
  constructor(private formBuilder:FormBuilder, @Inject(MAT_DIALOG_DATA) private data:Array<ItemData>, private http:HttpClient) { }

  ngOnInit(): void {
    
    this.userControl = this.formBuilder.group({
      nameCtrl: ['', Validators.required],
      phoneCtrl: ['', Validators.required]
    })
    this.infoControl = this.formBuilder.group({
      addrCtrl: ['', Validators.required]
    })
  }

  done(){
    console.log(this.userControl);
  }

}
