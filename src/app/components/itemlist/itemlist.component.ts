import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, CdkDragEnter, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import config from '../../../assets/config.json';

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
  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.getItemList();
  }

  getItemList(){
    let options = {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("access_token"))
    };

    this.http.get<any[]>(config.url.main + config.url.item.list + "/" + 1, options).subscribe({
      next: data=>{
        data.forEach(item => {
          item.count = 1;
          this.itemList.push(item);
        });
      },
      error: err=>{
        this.router.navigate(["/login"]);
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
    if(item.count<20){
      item.count++;
    }
    this.itemList[this.itemList.map(item=>item.name).indexOf(itemName)] = item;
  }

  minus(itemName:string){
    var item = this.itemList.find((list)=>{return list.name === itemName});
    if(item.count>0){
      item.count--;
    }
    this.itemList[this.itemList.map(item=>item.name).indexOf(itemName)] = item;
  }
}
