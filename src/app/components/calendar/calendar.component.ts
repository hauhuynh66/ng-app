import { Component, OnInit } from '@angular/core';
import moment, { Moment } from 'moment';

interface CalendarDisplay{
  data : number,
  highlighted : boolean
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css', '../../global.style.css']
})

export class CalendarComponent implements OnInit {
  private currentTime : Date = new Date()
  private currentYear: number =this.currentTime.getFullYear();
  private currentMonth: number = this.currentTime.getMonth() + 1;

  public headerTimeDisplay : String = moment(this.currentTime).format("MM YYYY");
  public firstDateDisplayPosition : number = 0;
  public elementCnt = 6*7;
  public calendarElementList : CalendarDisplay[] = [];
  public fullWeekDayNames : string[] = []
  public shortWeekDayNames : string[] = ["Su", "M", "Tu", "W", "Th", "F", "Sa"]

  constructor() { }

  ngOnInit(): void {
    this.render()
  }

  nextmonth()
  {
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

  render()
  {
    let seletedMoment = moment(this.currentYear + " " + this.currentMonth, "YYYY MM");
    this.headerTimeDisplay = seletedMoment.format("MM YYYY");
    
    let firstDateOfMonth = new Date(this.currentYear, this.currentMonth - 1, 1);
    let firstDatePositionInWeek = moment(firstDateOfMonth).day();
    this.calendarElementList = Array.from({length : this.elementCnt}, (i)=> i = {data : 0, highlighted : false})
    let currentMonthDayCnt = seletedMoment.daysInMonth()

    for(let i = firstDatePositionInWeek;i < firstDatePositionInWeek + currentMonthDayCnt ;i++)
    {
      this.calendarElementList[i].data = i - firstDatePositionInWeek + 1;
      this.calendarElementList[i].highlighted = true;
    }

    let latestMonthDayCnt = moment(firstDateOfMonth).add(-1, 'M').daysInMonth()

    for(let i = firstDatePositionInWeek; i > 0; i--)
    {
      this.calendarElementList[firstDatePositionInWeek - i].data = latestMonthDayCnt - i + 1;
    }

    for(let i = firstDatePositionInWeek + currentMonthDayCnt; i < this.elementCnt; i ++)
    {
      this.calendarElementList[i].data = i - (firstDatePositionInWeek + currentMonthDayCnt) + 1;
    }
  }
}
