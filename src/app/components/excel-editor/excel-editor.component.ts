import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import config from "../../../assets/config.json";

interface ExcelData{
  rowNum:number,
  data:Array<any>
}

@Component({
  selector: 'app-excel-editor',
  templateUrl: './excel-editor.component.html',
  styleUrls: ['./excel-editor.component.css']
})
export class ExcelEditorComponent implements OnInit {
  @ViewChild('file') fileRef:ElementRef = {} as ElementRef;
  excelData:Array<ExcelData> = []
  excelHeader:ExcelData = {
    rowNum: 0,
    data: new Array()
  }
  
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  fileUpload(event:any){
    let file = event.target.files[0];
    let formData = new FormData();
    formData.append('file', file);

    if(file.name!==undefined){
      this.http.post<Array<ExcelData>>(config.url.main + config.url.excel.get, formData).subscribe({
        next: data=>{
          this.excelHeader = data.filter((val)=> val.rowNum == 0)[0];
          this.excelData = data.filter((val)=> val.rowNum > 0);
        }
      });
    }

    this.fileRef.nativeElement.value = '';
  }

  test(cell:any){
    
  }

}
