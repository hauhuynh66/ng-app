import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RxStompService } from 'src/app/stomp.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  messages : Array<String> = Array()
  message : FormControl = new FormControl("")
  constructor(private rxStompService: RxStompService) {
  }

  ngOnInit(): void {
    this.rxStompService.watch('/topic/demo').subscribe((message) => {
      this.messages.push(message.body);
    });
  }

  publish(){
    const message = `Message generated at ${new Date()}`;
    this.rxStompService.publish({ destination: '/topic/demo', body: message });
  }

}
