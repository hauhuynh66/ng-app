import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { cf, ms } from '../../../asset.loader';
import { LoadingComponent } from '../dialog/loading/loading.component'; 

interface Content{
  paragraph : String,
  link : String
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css', '../../global.style.css']
})

export class MainPageComponent implements OnInit {
  public imageLinks = Array<String>()
  public content = Array<Content>()
  public active: Number = 0
  constructor(private http : HttpClient, private dlg: MatDialog) { 

  }

  ngOnInit(): void {
    var p : any = ms.main.paragraph

    for(var key in p){
      this.content.push({
        paragraph : p[key],
        link : ""
      })
    }

    let options = {
      params : {
        cnt : 5
      }
    }
    this.http.get<Array<String>>(cf.url.main + cf.url.global.cr, options).subscribe({
      next: data => {
        var i = 0;
        data.forEach(link => {
          this.content[i].link = link
          i++;
        });
      },
      error: err => {
        console.log(err)
      }
    })
  }

  openDialog(){
    this.dlg.open(LoadingComponent, {
      width : '500px',
      height : '300px',
      disableClose : true
    })
  }

}
