import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensaje = '';
  elemento: any;

  constructor(public _chatService: ChatService) {
     this._chatService.loadMessages()
             .subscribe(  () => {
               setTimeout( () =>  {
                 this.elemento.scrollTop = this.elemento.scrollHeight;
               }, 20);
             });
   }

  ngOnInit() {
    this.elemento = document.getElementById('mensaje-box');
  }

  enviarMensaje () {
    if (this.mensaje.length === 0) {
      return;
    }
    this._chatService.addMessage(this.mensaje)
            .then( () => {
              //console.log('Mensaje Enviado');
              this.mensaje = '';          
            })
            .catch( () => {
              console.error('No se pudo entregar el mensaje');
            });

  }

}
