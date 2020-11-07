import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { phonebook } from '../model/phonebook';

@Injectable({
  providedIn: 'root'
})
export class ContactserviceService {

  constructor(public afs: AngularFirestore) { }

  saveContact(doc:string, data: phonebook){{
    return this.afs.collection(doc).add(data)
  }}

  getAllContacts(doc:string){
    return this.afs.collection(doc).valueChanges()
  }

  getOneContact(doc:string, id:string){
    return  this.afs.doc<phonebook>(`${doc}/${id}`).valueChanges()
  }

  updateContact(doc:string, id:string, data: phonebook){
    return this.afs.doc(`${doc}/${id}`).update(data)
  }

  deleteContact(doc:string, id:string){
    return this.afs.doc(`${doc}/${id}`).delete()
  }
}
