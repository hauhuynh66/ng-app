import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-purchase-dialog',
  templateUrl: './purchase-dialog.component.html',
  styleUrls: ['./purchase-dialog.component.css']
})
export class PurchaseDialogComponent implements OnInit {
  userControl:FormGroup = this.formBuilder.group({});
  infoControl:FormGroup = this.formBuilder.group({});
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.userControl = this.formBuilder.group({
      nameCtrl: ['', Validators.required],
      phoneCtrl: ['', Validators.required]
    })
    this.infoControl = this.formBuilder.group({
      addrCtrl: ['', Validators.required]
    })
  }

}
