import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Messages } from '../interface/message.interface';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsColecctions: AngularFirestoreCollection<Messages>;
  public chats: Messages[] = [];
  public usuario: any = {};

  constructor( private afs: AngularFirestore,
               public afAuth: AngularFireAuth) {

       this.afAuth.authState.subscribe( user => {
         console.log(user);
         if (!user) {
           return;
         }
         this.usuario.nombre = user.displayName;
         this.usuario.uid = user.uid;
       });         

   }

   loadMessages () {
     this.itemsColecctions = this.afs.collection<Messages>('chats', ref => ref.orderBy('fecha', 'desc').limit(10));
     return this.itemsColecctions.valueChanges().pipe(
                     map( (mensajes: Messages[]) => {
                       console.log(mensajes);
                       
                       this.chats = [];
                       for (let mensaje of mensajes) {
                         this.chats.unshift(mensaje);
                       }
                      return this.chats;
                     }));
   }


   addMessage (texto: string) {
    let mensaje: Messages = {
        nombre: 'Demo',
        mensaje: texto,
        fecha: new Date().getTime()
      };
      return this.itemsColecctions.add(mensaje);
   }

   login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }

}
