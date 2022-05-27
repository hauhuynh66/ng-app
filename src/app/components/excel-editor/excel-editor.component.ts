import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { cf, ms} from '../../../asset.loader';
import { TextInputDialogComponent } from '../dialog/text-input-dialog/text-input-dialog.component';
import moment from 'moment';

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
  excelHeader:string[] = [];
  
  constructor(private http:HttpClient, private sb:MatSnackBar, private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  fileUpload(event:any){
    let file = event.target.files[0];
    let formData = new FormData();
    formData.append('file', file);

    if(file.name!=null){
      this.http.post<Array<ExcelData>>(cf.url.main + cf.url.excel.get, formData).subscribe({
        next: data=>{
          this.clear();
          if(data==null){
            this.sb.open(ms.ERR_NO.NO_1, ms.ACTION_MESSAGE.OK, {
              duration: 2000
            });
          }else{
            let header = data.filter((val)=> val.rowNum == 0)[0];
            
            this.excelHeader = header.data.map(x=>x.value);
            this.excelData = data.filter((val)=> 
              val.rowNum > 0 && val.data.length===this.excelHeader.length
            );
          }
          console.log(this.excelHeader);
          console.log(this.excelData);
        }
      });
    }

    this.fileRef.nativeElement.value = '';
  }

  clear(){
    this.excelData = []
    this.excelHeader = []
    this.fileRef.nativeElement.value = '';
  }

  edit(row:any, i:number){
    let dialogRef = this.dialog.open(TextInputDialogComponent,{
      width: '600px',
      data: {
        "data" : row.data[i].value,
        "type" : row.data[i].type
      }
    });
    dialogRef.componentInstance.changedData.subscribe(data =>{
      row.data[i].value = data
    });
  }

}
