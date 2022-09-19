import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';  

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  @ViewChild("map") myMap : ElementRef = {} as ElementRef;
  constructor() { }
  
  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(){
    const uluru = { lat: -25.344, lng: 131.031 };
    const map = new google.maps.Map(this.myMap.nativeElement as HTMLElement, {
      zoom: 4,
      center: uluru,
    });

    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
    console.log(map);
    
  }
}
