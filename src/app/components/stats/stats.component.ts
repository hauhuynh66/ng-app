import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  type:string = 'line';
  data:any;
  options:any;

  constructor() {
    this.data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };
    
    this.options = {
      responsive: true,
      maintainAspectRatio: false
    };
  }

  ngOnInit(): void {
  }

}
