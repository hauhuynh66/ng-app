import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of, reduce } from 'rxjs';
import config from '../../../assets/config.json';
import moment from 'moment';


interface WeatherData{
  temp : number,
  humid : number,
  dt : number,
  description : string,
  main : string
}

interface ForecastData{
  data : Array<WeatherData>
}

@Component({
  selector: 'app-misc',
  templateUrl: './misc.component.html',
  styleUrls: ['./misc.component.css', '../../global.style.css']
})

export class MiscComponent implements OnInit {
  weatherData : WeatherData = {
    temp : 0,
    humid : 0,
    dt : 0,
    description : 'test' ,
    main : ''
  }

  forecastData: ForecastData = {
    data : Array(this.weatherData)
  };

  name : string = 'CITY_NAME';

  chartData : any = {

  }

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  chartType = 'line';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getForecastData();
  }

  getForecastData(){
    let weatherOptions = {
      params: {
        lat : config.openweathermap.defaults.lat,
        lon : config.openweathermap.defaults.lon,
        appid : config.openweathermap.key
      }
    }
    let forecastOptions = {
      params : {
        lat : config.openweathermap.defaults.lat,
        lon : config.openweathermap.defaults.lon,
        appid : config.openweathermap.key,
        cnt : 40
      }
    }

    this.http.get<any>(config.openweathermap.url.weather, weatherOptions).subscribe({
      next: data=>{
        this.weatherData = {
          temp : data.main.temp - 273.15,
          humid : data.main.humidity,
          description : data.weather[0].description,
          dt : data.dt,
          main : data.weather[0].main
        }
      },
      error : err=>{
        console.log(err.message);
        
      }
    })
    
    this.http.get<any>(config.openweathermap.url.forecast, forecastOptions).subscribe({
      next: data =>{
        console.log(data);
        
        let fList : Array<any> = data.list;
        let label : Array<string> = [];
        this.name = data.city.name;
        this.forecastData.data = []

        fList.forEach(e =>{
          label.push(moment(new Date(e.dt * 1000)).format("Do hh:mm"))
          let data : WeatherData = {
            temp : e.main.temp - 273.15,
            humid : e.main.humidity,
            description : e.weather[0].description,
            dt : e.dt,
            main : e.weather[0].main
          }
          this.forecastData.data.push(data)
        })

        this.chartData = {
          labels : label,
          datasets : [
            {
              label : "Temperature",
              data : this.forecastData.data.map(x=>x.temp),
              borderColor : 'red'
            },
            {
              label : "Humidity",
              data : this.forecastData.data.map(x=>x.humid),
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
