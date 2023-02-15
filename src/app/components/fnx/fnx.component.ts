import { Component, OnInit } from '@angular/core';

export interface MenuItem{
  displayName : string,
  link : string
}

@Component({
  selector: 'app-fnx',
  templateUrl: './fnx.component.html',
  styleUrls: ['./fnx.component.css','../../global.style.css']
})


export class FnxComponent implements OnInit {
  public nItem : MenuItem[] = []

  constructor() { }

  ngOnInit(): void {
    this.nItem = [
      {
        displayName : "Drawing",
        link : "/draw"
      },
      {
        displayName : "GFT",
        link : "/gapi"
      }
    ]

    console.log(this.nItem)
  }

}
