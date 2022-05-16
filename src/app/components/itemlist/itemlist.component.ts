import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, CdkDragEnter, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import config from '../../../assets/config.json';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})
export class ItemlistComponent implements OnInit {
  @Input() itemList:any[] = [];
  @Output() itemCountChange = new EventEmitter();
  purchaseList:any[] = [];
  total:number = 0;
  count:number = 0;
  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.getItemList(0);
  }

  pageChange(event:PageEvent){
    this.getItemList(event.pageIndex);
  }

  getItemList(page:number){
    let options = {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("access_token"))
    };

    this.http.get<number>(config.url.main + config.url.item.count, options).subscribe({
      next: data=>{
        this.count = data;
      },
      error: err=>{
        console.log(err);
      }
    })
    this.http.get<any[]>(config.url.main + config.url.item.list + "/" + page, options).subscribe({
      next: data=>{
        this.itemList = []
        data.forEach(item => {
          item.count = 1;
          this.itemList.push(item);
        });
      },
      error: err=>{
        if(err.status === 403){
          this.router.navigate(["/login"]);
        }
      }
    })
  }
  drop(event:CdkDragDrop<any[]>){
    if(event.previousContainer===event.container){
      
    }else{
      let item = this.itemList[event.previousIndex];
      for(let i = 1; i <= item.count;i++){
        copyArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }
    this.total = this.purchaseList.length>0?this.purchaseList.map(item=>item.price).reduce(function(a,b){return a+b}):0;
  }

  deleteP(item:any){
    let index = this.purchaseList.indexOf(item);
    if(index!==-1){
      this.purchaseList.splice(index,1);
    }
    this.total = this.purchaseList.length>0?this.purchaseList.map(item=>item.price).reduce(function(a,b){return a+b}):0;
  }

  plus(itemName:string){
    var item = this.itemList.find((list)=>{return list.name === itemName});
    
    if(item.count < 20){
      item.count++;
    }

    this.itemList[this.itemList.map(item=>item.name).indexOf(itemName)] = item;
    this.itemCountChange.emit(item.count);
  }

  minus(itemName:string){
    var item = this.itemList.find((list)=>{return list.name === itemName});
    
    if(item.count > 1){
      item.count--;
    }

    this.itemList[this.itemList.map(item=>item.name).indexOf(itemName)] = item;
    this.itemCountChange.emit(item.count);
  }
}
