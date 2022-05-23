import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  isShow:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  search(){
    if(this.validate()===true){
      this.isShow = true;
    }else{
      this.isShow = false;
    }
  }

  validate(){
    return true;
  }
}
