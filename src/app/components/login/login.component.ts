import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private chatSrv: ChatService) { }

  ngOnInit() {
  }

  ingresar (custom: string) {

    if (custom === 'google') {
      this.chatSrv.login();
    } else {
      console.log('Tweeter segui participando!');
    }


  }


}
