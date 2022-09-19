import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cf } from '../../../asset.loader';

interface Item{
  price:number;
  name:string;
  description:string;
  imgUrl:string;
}

interface Comment{
  star : number;
  content : string;
  from : string;
}

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css', '../../global.style.css']
})
export class ItemDetailComponent implements OnInit  {
  itemName : string|null = "";
  itemDetail : Item = {} as Item
  constructor(private route : ActivatedRoute, private http : HttpClient) {

  }

  ngOnInit(): void {
    this.itemName = this.route.snapshot.paramMap.get('name');
    this.http.get<any>(cf.url.main + cf.url.item.detail + "/" + this.itemName).subscribe({
      next : data=>{
        console.log(data);
        this.itemDetail = {
          price : data.price,
          name : data.name,
          description : data.description,
          imgUrl : data.imgUrl
        }
        
      },
      error : err=>{
        console.log(err.message);
      }
    })
  }
}
