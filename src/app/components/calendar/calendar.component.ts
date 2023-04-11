import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { Blur } from 'src/app/animation';

interface CalendarDisplay{
  data : number,
  highlighted : boolean,
  date? : Date
}

export interface CalendarEvent{
  name : string,
  start : Date,
  end : Date
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css', '../../global.style.css'],
  animations: [
    trigger('blur', [
      transition('iddle=>run',[
        useAnimation(Blur, {
          params : {
            x : 10,
            length: '1'
          }
        })
      ])
    ])
  ]
})

export class CalendarComponent implements OnInit {
  
  private currentTime : Date = new Date()
  private currentYear: number = this.currentTime.getFullYear();
  private currentMonth: number = this.currentTime.getMonth() + 1;

  public headerTimeDisplay : String = moment(this.currentTime).format("MM YYYY");
  public firstDateDisplayPosition : number = 0;
  public elementCnt = 6*7;
  public calendarElementList : CalendarDisplay[] = [];
  public fullWeekDayNames : string[] = []
  public shortWeekDayNames : string[] = ["Su", "M", "Tu", "W", "Th", "F", "Sa"]

  public selected : Date = this.currentTime
  public state : string = 'iddle'
  public events : CalendarEvent[] = []

  constructor() { }

  ngOnInit(): void {
    this.events = [
      {
        name : "EVENT 1",
        start : new Date(2023, 1, 28),
        end : new Date(2023, 2, 1)
      }
    ]
    this.render()
  }

  nextmonth()
  {
    this.state = 'run'
    if(this.currentMonth > 11
      )
    {
      this.currentMonth = 1;
      this.currentYear++;
    }else{
      this.currentMonth++;
    }
    this.render()
  }

  previousmonth()
  {
    this.state = 'run'
    if(this.currentMonth < 2)
    {
      this.currentMonth = 12;
      this.currentYear--;
    }else
    {
      this.currentMonth--;
    }
    this.render()
    
  }

  select(element : any)
  {
    this.selected = element.date
  }

  isDisp(element : any)
  {
    if(moment(element.date).format("YYYY MM DD") == moment(new Date()).format("YYYY MM DD"))
    {
      return 1;
    }
    else if(element.highlighted)
    {
      return 0;
    }
    else{
      return -1;
    }
  }


  render()
  {
    let seletedMoment = moment(this.currentYear + " " + this.currentMonth, "YYYY MM");
    this.headerTimeDisplay = seletedMoment.format("MM YYYY");
    
    let firstDateOfMonth = new Date(this.currentYear, this.currentMonth - 1, 1);
    let firstDatePositionInWeek = moment(firstDateOfMonth).day();
    this.calendarElementList = Array.from({length : this.elementCnt}, (i)=> i = {data : 0, highlighted : false})
    let currentMonthDayCnt = seletedMoment.daysInMonth()

    //current month
    for(let i = firstDatePositionInWeek;i < firstDatePositionInWeek + currentMonthDayCnt ;i++)
    {
      let d : CalendarDisplay = {
        data : i - firstDatePositionInWeek + 1,
        highlighted : true,
        date : new Date(this.currentYear, this.currentMonth - 1, i - firstDatePositionInWeek + 1)
      }

      this.calendarElementList[i] = d;
    }

    let latestMonth = moment(firstDateOfMonth).add(-1, 'M')
    let nextMonth = moment(firstDateOfMonth).add(1, 'M')

    let latestMonthDayCnt = latestMonth.daysInMonth()

    //last month
    for(let i = firstDatePositionInWeek; i > 0; i--)
    {
      let d : CalendarDisplay = {
        data : latestMonthDayCnt - i + 1,
        highlighted : false,
        date : new Date(latestMonth.toDate().getFullYear(), latestMonth.toDate().getMonth(), latestMonthDayCnt - i + 1)
      }
      this.calendarElementList[firstDatePositionInWeek - i] = d;
    }

    //next month
    for(let i = firstDatePositionInWeek + currentMonthDayCnt; i < this.elementCnt; i ++)
    {
      let d : CalendarDisplay = {
        data : i - (firstDatePositionInWeek + currentMonthDayCnt) + 1,
        highlighted : false,
        date : new Date(nextMonth.toDate().getFullYear(), nextMonth.toDate().getMonth(), i - (firstDatePositionInWeek + currentMonthDayCnt) + 1)
      }

      this.calendarElementList[i] = d;
    }
  }

  today()
  {
    this.state = 'run'

    this.currentYear = this.currentTime.getFullYear();
    this.currentMonth = this.currentTime.getMonth() + 1;

    this.render();
  }
}
