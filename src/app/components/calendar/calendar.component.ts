import { Component, OnInit } from '@angular/core';
import moment from 'moment';

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
  private time : Date = new Date()
  private now : moment.Moment = moment(this.time);
  public headerDisp : String = this.now.format("MM YYYY");
  public firstDisp : number = 0;
  public n = 6*7;
  public icalendar : CalendarDisplay[] = [];

  constructor() { }

  ngOnInit(): void {
    let first = new Date(this.time.getFullYear(), this.time.getMonth(), 1);
    let firstpos = moment(first).day();
    this.icalendar = Array.from({length : this.n}, (i)=> i = {data : 0, highlighted : false})
    let diM = this.now.daysInMonth()

    for(let i = firstpos;i < firstpos + diM ;i++)
    {
      this.icalendar[i].data = i - firstpos + 1;
      this.icalendar[i].highlighted = true;
    }

    let diLM = moment(first).add(-1, 'M').daysInMonth()

    for(let i = firstpos; i > 0; i--)
    {
      this.icalendar[firstpos - i].data = diLM - i + 1;
    }

    for(let i = firstpos + diM; i < this.n; i ++)
    {
      this.icalendar[i].data = i - (firstpos + diM) + 1;
    }

    console.log(this.icalendar)


  }
}
