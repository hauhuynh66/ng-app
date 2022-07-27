import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  messages : Array<String> = Array()
  message : FormControl = new FormControl("")
  constructor() {
  }

  ngOnInit(): void {
    
  }

  publish(){
    
  }

}
