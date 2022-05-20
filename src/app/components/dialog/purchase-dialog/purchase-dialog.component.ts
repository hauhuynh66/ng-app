import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  isComplete:boolean = false;
  userControl:FormGroup = this.formBuilder.group({});
  infoControl:FormGroup = this.formBuilder.group({});
  purchaseList:ItemData[] = [];
  @Output() isConfirm:EventEmitter<boolean> = new EventEmitter();
  constructor(private dialogRef:MatDialogRef<PurchaseDialogComponent> ,
    private formBuilder:FormBuilder, @Inject(MAT_DIALOG_DATA) private list:any, private http:HttpClient) { 
      this.purchaseList = list.data;
    }

  ngOnInit(): void {
    this.userControl = this.formBuilder.group({
      nameCtrl: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25)
      ]),
      phoneCtrl: new FormControl('',[
        Validators.required,
        Validators.pattern('\\(?([0-9]{3})\\)?([ .-]?)([0-9]{3})\\2([0-9]{4})')
      ])
    })
    this.infoControl = this.formBuilder.group({
      addrCtrl: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ])
    })
  }

  done(){
    let requestData:PurchaseRequest = {
      name: this.userControl.value.nameCtrl,
      phone: this.userControl.value.phoneCtrl,
      address: this.infoControl.value.addrCtrl,
      items: this.list
    }
    this.http.post(config.url.main + config.url.item.purchase, requestData).subscribe({
      next: data=>{
        console.log(data);
      },
      error: err=>{
        console.log(err.status);
      }
    })
    this.isConfirm.emit(true);
  }

  check(){
    this.isComplete = this.userControl.valid&&this.infoControl.valid
  }
}
