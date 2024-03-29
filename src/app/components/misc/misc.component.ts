import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { cf } from '../../../asset.loader';

import moment from 'moment';

interface GeolocationData{
  ip : string,
  city : string,
  lon : number,
  lat : number
}

interface TimeData{
  hour : number,
  minute : number,
  second : number
}

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

  public sun  = {
    sunrise : 0,
    sunset : 0
  }

  forecastData : ForecastData = {
    data : Array(this.weatherData)
  };

  //change later
  locationData : GeolocationData = {
    ip : "115.77.184.52",
    city : "Ho Chi Minh City",
    lon : 106.6667,
    lat : 10.7500
  }

  chartData : any = {

  }

  time : TimeData = {
    hour : 0,
    minute : 0,
    second : 0
  }

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  chartType = 'line';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getForecastData(this.locationData);

    setInterval(()=>{
      this.getForecastData(this.locationData);
    }, 1000*60*5);
  }

  getTimeString(time : TimeData){
    return this.pad(time.hour,2) + ":" + this.pad(time.minute,2) + ":" + this.pad(time.second,2);
  }

  pad(num : number, length : number){
    let strNum = num + ""
    while(strNum.length < length){
      strNum = "0"+ strNum
    }
    return num
  }

  unixToTime(unix : number){
    let t = new Date(unix*1000);
    let time : TimeData =  {
      hour : t.getHours(),
      minute : t.getMinutes(),
      second : t.getSeconds()
    }
    return time
  }

  getTime(geolocation : GeolocationData){
    this.http.get<any>(cf.time.url + geolocation.ip).subscribe({
      next : data =>{
        this.time = this.unixToTime(data.unixtime);
        setInterval(()=>{
          this.processTime(this.time)
        }, 1000)
      }
    })
  }

  processTime(time : TimeData){
    if(time.second<=60){
      time.second++
    }else{
      if(time.minute<=60){
        time.minute++
        time.second = 0
      }else{
        if(time.hour<=23){
          time.hour++
          time.minute = 0
        }else{
          time.hour = 0
          time.minute = 0
          time.second = 0
        }
      }
    }
  }

  getForecastData(location : GeolocationData){
    let weatherOptions = {
      params: {
        lat : location.lat,
        lon : location.lon,
        appid : cf.openweathermap.key
      }
    }
    let forecastOptions = {
      params : {
        lat : location.lat,
        lon : location.lon,
        appid : cf.openweathermap.key,
        cnt : 40
      }
    }

    this.http.get<any>(cf.openweathermap.url.weather, weatherOptions).subscribe({
      next: data=>{
        this.sun = {
          sunrise : data.sys.sunrise,
          sunset : data.sys.sunset,
        }
        
        this.weatherData = {
          temp : Math.ceil((data.main.temp - 273.15)*100)/100,
          humid : data.main.humidity,
          description : data.weather[0].description,
          dt : data.dt,
          main : data.weather[0].main
        }
      },
      error : err=>{
        
      }
    })
    
    this.http.get<any>(cf.openweathermap.url.forecast, forecastOptions).subscribe({
      next: data =>{
        let fList : Array<any> = data.list;
        let label : Array<string> = [];
        this.forecastData.data = []

        fList.forEach(e =>{
          label.push(moment(new Date(e.dt * 1000)).format("hh:mm A"))
          let data : WeatherData = {
            temp : Math.round((e.main.temp - 273.15)*100)/100,
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
              borderColor : 'red',
              borderWidth : 8,
              backgroundColor : 'rgba(255, 0, 0, 0.2)'

            },
            {
              label : "Humidity",
              data : this.forecastData.data.map(x=>x.humid),
              borderColor : 'blue',
              borderWidth : 8,
              backgroundColor : 'rgba(0, 0, 255, 0.2)'
            }
          ]
        }
      },
      error : err =>{

      }
    });
    
  }
}
