import { Component, OnInit } from '@angular/core';
import config from '../../../assets/config.json';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat = config.openweathermap.defaults.lat;
  lng = config.openweathermap.defaults.lon;

  constructor() { }

  ngOnInit(): void {
  }

}
