import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css']
})
export class ImportDataComponent implements OnInit {
  @ViewChild('fileInput') fileInput : ElementRef = {} as ElementRef;
  public fileName : string[] = ["Empty", "Empty", "Empty"];
  public flg = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event : any)
  {
    if(event.target.files.length > 0)
    {
      console.log(event.target.files[0].name);
      this.fileName[this.flg] = event.target.files[0].name;
    }
  }

  selectCountry()
  {
    this.fileInput.nativeElement.click();
    this.flg = 0;
  }

}
