import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-officeprocs',
  templateUrl: './officeprocs.component.html',
  styleUrls: ['./officeprocs.component.css', '../../global.style.css']
})
export class OfficeProcessesComponent implements OnInit {
  @ViewChild('input') input : ElementRef = {} as ElementRef;

  public files : any[] = []
  constructor(private http:HttpClient) {

  }

  ngOnInit(): void {

  }

  fileSelect()
  {
    this.input.nativeElement.click();
  }

  onFileSelect(event : any)
  {
    if(event.target.files.length > 0)
    {
      this.files.push(event.target.files[0]);
    }
  }

  check()
  {
    let formData = new FormData();
    console.log(this.files[0].name);
    formData.append("data",this.files[0]);
    this.http.post("http://localhost:8400/global/check", formData).subscribe({
      next: message=>{
        console.log(message)
      },
      error: err=>{
        console.log(err.message)
      }
    })
  }

}
