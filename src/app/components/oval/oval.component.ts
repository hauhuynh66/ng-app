import { AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import moment from 'moment';

export class Ellipse{
  private a : number = 0;
  private b : number = 0;

  constructor(r1 : number, r2 : number){
    this.a = r1;
    this.b = r2;
  }

  public getX(y : number) : number
  {
    if(Math.abs(y) > this.b){
      throw Error("Out of bound b")
    }
    
    let xPart = 1 - (Math.pow(y,2) / Math.pow(this.b, 2))
    return Math.sqrt(xPart * Math.pow(this.a,2))
  }

  public getY(x : number) : number
  {
    if(Math.abs(x) > this.a){
      throw Error("Out of bound a")
    }

    let yPart = 1- (Math.pow(x,2) / Math.pow(this.a, 2))
    return Math.sqrt(yPart * Math.pow(this.b,2))
  }

  public getArcFromX(x : number) : number
  {
    let y = this.getY(x)
    return Math.atan((y/x) * (this.a/this.b))
  }
  
  public getArcFromY(y : number) : number
  {
    let x = this.getX(y)
    return Math.atan((y/x) * (this.a/this.b))
  }
}

@Component({
  selector: 'app-oval',
  templateUrl: './oval.component.html',
  styleUrls: ['./oval.component.css']
})

export class OvalComponent implements AfterViewInit, OnChanges {
  @ViewChild("canvas") canvas : ElementRef<HTMLCanvasElement> = {} as ElementRef
  @HostListener('window:resize', ['$event']) 
  onResize(){
    this.canvas.nativeElement.width = window.innerWidth - 400;
    this.width = this.canvas.nativeElement.width;

    this.ctx.clearRect(0, 0 , this.width, this.height)
    this.render(this.ctx)
    this.drawSunPos(this.ctx, this.progress)
    this.drawText(this.ctx)
  }
  
  @Input("start") start : number = 0;
  @Input("end") end : number = 0;
  @Input("prog") progress : number = 0;
  @Input("mode") mode : string = "time";

  private ctx : CanvasRenderingContext2D = {} as CanvasRenderingContext2D;
  private width: number = 0;
  private height: number = 0;
  private padding : number = 60;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
      if(!changes['progress'].isFirstChange())
      {
        this.ctx.clearRect(0, 0 , this.width, this.height)
        this.render(this.ctx)
        this.drawSunPos(this.ctx, this.progress)
        this.drawText(this.ctx)
      }
  }

  ngAfterViewInit(): void {
    
    this.canvas.nativeElement.width = window.innerWidth - 400;
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.height = this.canvas.nativeElement.height;
    this.width = this.canvas.nativeElement.width;

    this.render(this.ctx)
    this.drawSunPos(this.ctx, this.progress)
    this.drawText(this.ctx)
  }

  render(ctx : CanvasRenderingContext2D)
  {
    let r1 = (this.width/2)  - this.padding
    let r2 = this.height - this.padding

    ctx.lineWidth = 20
    ctx.strokeStyle = "#000000"
    ctx.beginPath()
    ctx.ellipse(this.width/2, this.height, r1 , r2 , 0, 1*Math.PI, 2*Math.PI)
    ctx.stroke()
  }

  drawSunPos(ctx : CanvasRenderingContext2D, progress : number)
  {
    let r1 = (this.width/2) - this.padding + 10
    let r2 = this.height - this.padding + 10

    let centerY = (Math.abs(this.end) - Math.abs(this.start))/2
    let translatedProg = ((progress - (centerY + this.start)) / centerY) * r1

    let ellipse = new Ellipse(r1, r2)
    let arc = ellipse.getArcFromX(translatedProg) * 180 / Math.PI
    let sweep = 0;

    if(arc > 0)
    {
      sweep = 90 + (90-arc)
    }
    else
    {
      sweep = Math.abs(arc)
    }

    let rad = (180 + sweep) * Math.PI/180

    ctx.lineWidth = 20
    ctx.strokeStyle = "#FFFF00"
    ctx.beginPath()
    ctx.ellipse(this.width/2, this.height, r1 , r2 , 0, 1*Math.PI, rad)
    ctx.stroke()
  }

  drawText(ctx : CanvasRenderingContext2D)
  {
    switch(this.mode)
    {
      case "time":
        let startTime = moment(new Date(this.start*1000)).format("HH:mm A")
        let endTime = moment(new Date(this.end*1000)).format("HH:mm A")
        var bounds;

        //draw text
        ctx.font = "20px Comic Sans MS";
        bounds = this.ctx.measureText(startTime);
        ctx.fillText(startTime, (bounds.width / 2) + this.padding, this.height - (bounds.actualBoundingBoxAscent + bounds.actualBoundingBoxDescent)/2 );
        
        bounds = this.ctx.measureText(endTime);
        ctx.fillText(endTime, this.width - bounds.width - this.padding - 40, this.height - (bounds.actualBoundingBoxAscent + bounds.actualBoundingBoxDescent)/2 );
        break;

      default:
        //later
        break;
    }
  }

}
