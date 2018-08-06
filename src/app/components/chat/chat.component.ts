import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensaje = '';

  constructor(public _chatService: ChatService) {
     this._chatService.loadMessages()
             .subscribe();
   }

  ngOnInit() {
  }

  enviarMensaje () {
    console.log(this.mensaje);
  }

}
