import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, reduce } from 'rxjs';
import config from '../../../assets/config.json'
@Component({
  selector: 'app-misc',
  templateUrl: './misc.component.html',
  styleUrls: ['./misc.component.css']
})

export class MiscComponent implements OnInit {
  t: any = "";
  h: any = "";
  forecastData:any = {};
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  chartType = 'line';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getWeatherData();
    this.getForecastData();
  }

  getWeatherData(){
    let p = {
      lat : config.openweathermap.defaults.lat,
      lon : config.openweathermap.defaults.lon,
      appid : config.openweathermap.key
    }

    let weatherOptions = {
      params : p
    }
    this.http.get<any>(config.openweathermap.url.weather, weatherOptions).subscribe({
      next: data =>{
        this.t = data.main.temp - 273.15;
        this.h = data.main.humidity;
      },
      error : err =>{
        console.log(err.message);
      }
    });
  }

  getForecastData(){
    let p = {
      lat : config.openweathermap.defaults.lat,
      lon : config.openweathermap.defaults.lon,
      appid : config.openweathermap.key
    }

    let forecastOptions = {
      params : p
    }
    this.http.get<any>(config.openweathermap.url.forecast, forecastOptions).subscribe({
      next: data =>{
        console.log(data);
        let fList:Array<any> = data.list;
        let label:Array<any> = [];
        let tData:Array<number> = [];
        let fData:Array<number> = [];
        fList.forEach(e =>{
          let date = new Date(e.dt*1000);
          let dateLabel = 
            date.getFullYear().toString().concat("/", date.getMonth().toString(),"/", date.getDay().toString(), "  ",
            date.getHours().toString(), ":", date.getMinutes().toLocaleString('en-US',{minimumIntegerDigits:2}));
          label.push(dateLabel);
          tData.push(e.main.temp - 273.15);
          fData.push(e.main.humidity);
        })

        this.forecastData = {
          labels : label,
          datasets : [
            {
              label : "Temperature",
              data : tData,
              borderColor : 'red'
            },
            {
              label : "Humidity",
              data : fData,
              borderColor : 'blue'
            }
          ]
        }
      },
      error : err =>{
        console.log(err.message);
      }
    });
    
  }
}
