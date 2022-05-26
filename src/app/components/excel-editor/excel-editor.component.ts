import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { cf, ms} from '../../../asset.loader';
import { TextInputDialogComponent } from '../dialog/text-input-dialog/text-input-dialog.component';

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

    if(file.name!==undefined){
      this.http.post<Array<ExcelData>>(cf.url.main + cf.url.excel.get, formData).subscribe({
        next: data=>{
          if(data==null){
            this.sb.open(ms.ERR_NO.NO_1, ms.ACTION_MESSAGE.OK, {
              duration: 2000
            });
          }else{
            let header = data.filter((val)=> val.rowNum == 0)[0];
            this.excelData = data.filter((val)=> val.rowNum > 0);
            this.excelHeader = header.data.map(x=>x.value);
          }
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
    console.log(row);
    this.dialog.open(TextInputDialogComponent,{
      width: '600px',
      data: {
        "data" : row.data[i].value,
        "type" : row.data[i].type
      }
    });
  }

}
