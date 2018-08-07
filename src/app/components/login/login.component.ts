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
      this.chatSrv.login(custom);
  }


}
