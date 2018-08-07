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
         //console.log(user);
         if (!user) {
           return;
         }
         this.usuario.nombre = user.displayName;
         this.usuario.uid = user.uid;
         this.usuario.email = user.email;
         this.usuario.photo = user.photoURL;
       });         

   }

   loadMessages () {
     this.itemsColecctions = this.afs.collection<Messages>('chats', ref => ref.orderBy('fecha', 'desc').limit(10));
     return this.itemsColecctions.valueChanges().pipe(
                     map( (mensajes: Messages[]) => {
                      // console.log(mensajes);
                       
                       this.chats = [];
                       for (let mensaje of mensajes) {
                         this.chats.unshift(mensaje);
                       }
                      return this.chats;
                     }));
   }


   addMessage (texto: string) {
    let mensaje: Messages = {
        nombre: this.usuario.nombre,
        mensaje: texto,
        fecha: new Date().getTime(),
        uid: this.usuario.uid
      };
      return this.itemsColecctions.add(mensaje);
   }

   login(custom: string) {
     if (custom === 'google') {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
     } else {
      this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider());
     }
  }
  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }

}
