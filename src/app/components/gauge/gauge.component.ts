import { AfterViewInit, Component, ElementRef, HostListener, Inject, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent implements AfterViewInit, OnChanges {
  @ViewChild('canvas') canvas : ElementRef<HTMLCanvasElement> = {} as ElementRef;
  @Input("val") value : number = 80 //as percent
  @Input("lineWidth") lineWidth : number = 40;
  @Input("max") max : number = 100
  @Input("min") min : number = 0

  private ctx : CanvasRenderingContext2D = {} as CanvasRenderingContext2D;
  private width : number = 0;
  private height : number = 0;

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.value = changes['value'].currentValue;
    if(!changes['value'].isFirstChange())
    {
      this.ctx?.clearRect(0, 0 , this.width, this.height)
      this.drawBaseLine(this.ctx);
      this.drawValue(this.ctx);
    }
  }

  ngAfterViewInit(): void {
      this.width  = this.canvas.nativeElement.width;
      this.height = this.canvas.nativeElement.height;
      this.ctx = this.canvas.nativeElement.getContext('2d')!;
      
      this.drawBaseLine(this.ctx);
      this.drawValue(this.ctx);
  }

  drawBaseLine(ctx : CanvasRenderingContext2D){
    let interval = this.lineWidth / 3;
    ctx.lineWidth = this.lineWidth;

    let r = (this.width > this.height? this.width:this.height)/2
    
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.arc(this.width/2, this.height , (r-this.lineWidth/2) - interval, 1*Math.PI, 2*Math.PI);
    ctx.stroke();
  }

  drawValue(ctx : CanvasRenderingContext2D){
    var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
    gradient.addColorStop(0,"green");
    gradient.addColorStop(0.5,"yellow");
    gradient.addColorStop(1,"red");

    let r = (this.width > this.height? this.width:this.height)/2
    
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    let percent = (this.value/(this.max - this.min))
    if(percent > 1)
    {
      percent = 1
    }
    ctx.arc(this.width/2, this.height, r-this.lineWidth/2, 1*Math.PI, 1*Math.PI + percent*Math.PI);
    ctx.stroke();

    //draw text
    ctx.font = "40px Comic Sans MS";
    let box = this.ctx.measureText(this.value + '');
    ctx.fillText(this.value+"", this.width/2 - (box.width / 2), this.height - (box.actualBoundingBoxAscent + box.actualBoundingBoxDescent)/2 );
  }
}
