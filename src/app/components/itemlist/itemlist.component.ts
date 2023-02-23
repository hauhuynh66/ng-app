import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import config from '../../../assets/config.json';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatChip, MatChipList } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchaseDialogComponent } from '../dialog/purchase-dialog/purchase-dialog.component';
import { transition, trigger, useAnimation } from '@angular/animations';
import { BlurOut, Jello, Shake } from 'src/app/animation';

interface Item{
  price:number;
  name:string;
  description:string;
  imgUrl:string;
  count:number;
  animationState?:string;
}

export interface ItemData{
  name: string;
  count: number;
  price: number;
}

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css', '../../global.style.css'],
  animations: [
    trigger('jello', [
      transition('added=>res',[
        useAnimation(Jello, {
          params : {
            length: '0.2'
          }
        })
      ])
    ]),
    trigger('shake', [
      transition('idle=>shake',[
        useAnimation(Shake, {
          params : {
            length: '0.1'
          }
        })
      ])
    ]),
    trigger('item', [
      transition('idle=>res',[
        useAnimation(BlurOut, {
          params : {
            length: '0.5'
          }
        })
      ])
    ])
  ]
})

export class ItemlistComponent implements OnInit {
  @Input() itemList:Array<Item> = [];
  @Output() itemCountChange = new EventEmitter();
  purchaseList:ItemData[] = [];
  limit:number = 12;
  count:number = 0;
  keywords:Array<any> = [];
  selected:Array<any> = [];
  searchText:FormControl = new FormControl("");
  sortOption:FormControl = new FormControl("NAME_ASC");
  badge:boolean = true;
  state = "added";
  state2 = "idle";
  state3 = "idle";

  constructor(private http:HttpClient, private router:Router, private dialog: MatDialog, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getItemList(0);
    this.getKeyword();
  }

  pageChange(event:PageEvent){
    this.limit = event.pageSize;
    this.getItemList(event.pageIndex);
  }

  getItemList(page:number){
    let data = {
      mode : this.sortOption.value,
      keys : this.selected.map(x=>x.word),
      limit : this.limit,
      sw : this.searchText.value
    }

    this.http.post<any>(config.url.main + config.url.item.list + "/" + page, data).subscribe({
      next: data=>{
        console.log(data);
        this.itemList = [];
        data.list.forEach((item: Item) => {
          item.animationState = "idle";
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
        
      }
    })
  }

  display(name : string){
    
  }
  
  drop(event:CdkDragDrop<any[]>){
    if(event.previousContainer===event.container){
      
    }else{
      let item = this.itemList[event.previousIndex];
      let list = this.purchaseList.map(x=>x.name);
      let index = list.indexOf(item.name);
      if(index!==-1){
        this.purchaseList[index].count += item.count
        this.purchaseList[index].price += item.count * item.price; 
      }else{
        if( item.count>0 ){
          this.purchaseList.push({
            name: item.name,
            count: item.count,
            price: item.price*item.count,
          });
          this.state = "res";
        }
        
      }
      this.itemList[event.previousIndex].count = 0;
    }
    this.badge = this.purchaseList.length<1;
  }

  resetAS(item : Item){
    item.animationState = "idle";
  }

  animateItem(item : Item){
    item.animationState = "res";
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
  }

  search(el:Element, chipList:MatChipList, paginator:MatPaginator){
    this.selected = [];
    chipList.chips.forEach(chip=>{
      if(chip.disabled){
        this.selected.push(chip.value);
      }
    });
    paginator.pageIndex = 0;
    this.getItemList(0);
    this.scrollTo(el);
  }

  clear(chipList:MatChipList){
    chipList.chips.forEach(chip =>{
      chip.selected = false;
      chip.disabled = false;
    });
    this.selected = [];
    this.getItemList(0);
  }

  sortOptionChange(paginator:MatPaginator){
    this.getItemList(paginator.pageIndex);
  }

  openInfoDialog(){
    if(this.purchaseList.length>0){
      let dialogRef = this.dialog.open(PurchaseDialogComponent, {
        width: '600px',
        data: {
          items : this.purchaseList
        }
      })

      dialogRef.componentInstance.isConfirm.subscribe(console.log);
    }

  }

  scrollTo(el: Element){
    el.scrollIntoView({
      behavior : 'smooth'
    });
    this.state2 = "shake"
  }

  openDetail(name : String){
    this.router.navigate(['/item', name]);
  }
}
