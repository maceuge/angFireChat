import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Messages } from '../interface/message.interface';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsColecctions: AngularFirestoreCollection<Messages>;
  public chats: Messages[] = [];

  constructor( private afs: AngularFirestore) {

   }

   loadMessages () {
     this.itemsColecctions = this.afs.collection<Messages>('chats');
     return this.itemsColecctions.valueChanges().pipe(
                     map( (mensaje: Messages[]) => {
                       console.log(mensaje);
                     }));
   }
}
