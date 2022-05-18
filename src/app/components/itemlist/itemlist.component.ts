import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, CdkDragEnter, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import config from '../../../assets/config.json';
import { PageEvent } from '@angular/material/paginator';
import { MatChip, MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchaseComponent } from '../purchase/purchase.component';
import { PurchaseDialogComponent } from '../dialog/purchase-dialog/purchase-dialog.component';

interface Item{
  count:number;
  price:number;
  name:string;
  description:string;
  imgUrl:string;
}

interface ItemData{
  result:Array<Item>;
  count:number;
}

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css', '../../global.style.css']
})
export class ItemlistComponent implements OnInit {
  @Input() itemList:Array<Item> = [];
  @Output() itemCountChange = new EventEmitter();
  purchaseList:any[] = [];
  total:number = 0;
  count:number = 0;
  keywords:Array<any> = [];
  selected:Array<any> = [];
  searchText:FormControl = new FormControl("");
  sortOption:FormControl = new FormControl("NAME_ASC");
  currentPage = 0;
  constructor(private http:HttpClient, private router:Router, private dialog: MatDialog, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getItemList(this.currentPage);
    this.getKeyword();
  }

  pageChange(event:PageEvent){
    this.currentPage = event.pageIndex;
    this.getItemList(this.currentPage);
  }

  getItemList(page:number){
    let data = {
      mode : this.sortOption.value,
      keys : this.selected.map(x=>x.word),
      sw : this.searchText.value,
    }

    this.http.post<ItemData>(config.url.main + config.url.item.list + "/" + page, data).subscribe({
      next: data=>{
        this.itemList = [];
        data.result.forEach(item => {
          item.count = 0;
          this.itemList.push(item);
        });
        this.count = data.count;
      },
      error: err=>{
        if(err.status === 403){
          this.router.navigate(["/login"]);
        }
      }
    })
  }

  getKeyword(){
    this.http.get<string[]>(config.url.main + config.url.item.word).subscribe({
      next: data=>{
        this.keywords = data;
      },
      error: err=>{
        // if(err.status === 403){
        //   this.router.navigate(["/login"]);
        // }
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
    if(item!.count < 20){
      item!.count++;
    }

    this.itemList[this.itemList.map(item=>item.name).indexOf(itemName)] = item!;
    this.itemCountChange.emit(item!.count);
  }

  minus(itemName:string){
    var item = this.itemList.find((list)=>{return list.name === itemName});
    
    if(item!.count > 1){
      item!.count--;
    }

    this.itemList[this.itemList.map(item=>item.name).indexOf(itemName)] = item!;
    this.itemCountChange.emit(item!.count);
  }

  toggleSelection(chip: MatChip){
    chip.toggleSelected();
    chip.disabled=!chip.disabled;
    if(chip.disabled){
      this.selected.push(chip.value);
    }else{
      let index = this.selected.indexOf(chip.value);
      this.selected.splice(index,1);
    }
  }

  search(){
    this.getItemList(0);
  }

  clear(chipList:MatChipList){
    chipList.chips.forEach(chip =>{
      chip.selected = false;
      chip.disabled = false;
    });
    this.selected = [];
  }

  sortOptionChange(){
    this.getItemList(this.currentPage);
  }

  openInfoDialog(){
    if(this.purchaseList.length>0){
      this.dialog.open(PurchaseDialogComponent, {
        width: '600px'
      })
    }
  }
}
