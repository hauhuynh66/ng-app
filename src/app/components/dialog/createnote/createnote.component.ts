import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Note } from '../../notelist/notelist.component';

@Component({
  selector: 'app-createnote',
  templateUrl: './createnote.component.html',
  styleUrls: ['./createnote.component.css']
})
export class CreatenoteComponent implements OnInit {
  @Output() note:EventEmitter<Note> = new EventEmitter();
  title:FormControl = new FormControl('');
  displayDate:FormControl = new FormControl(new Date())
  content:FormControl = new FormControl('');
  constructor(private dialogRef:MatDialogRef<CreatenoteComponent>) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  addNote(){
    this.note.emit({
      title: this.title.value,
      displayDate: this.displayDate.value,
      message: this.content.value
    });
  }

}
