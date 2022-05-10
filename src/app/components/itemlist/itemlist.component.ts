import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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
  itemList:any[] = [];
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
        this.itemList = data;
        console.log(this.itemList);
      },
      error: err=>{
        this.router.navigate(["/login"]);
      }
    })
  } 


  drop(event:CdkDragDrop<any[]>){
    if(event.previousContainer===event.container){

    }else{
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.total = this.purchaseList.map(item=>item.price).reduce(function(a,b){return a+b});
  }

  deleteP(item:any){
    let index = this.purchaseList.indexOf(item);
    if(index!==-1){
      this.purchaseList.splice(index,1);
    }
    this.total = this.purchaseList.map(item=>item.price).reduce(function(a,b){return a+b});
  }

}
