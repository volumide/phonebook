import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { phonebook } from '../model/phonebook';
import { ContactserviceService } from '../services/contactservice.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contact: phonebook= {
    name: "",
    phone : "",
  }
  id:string
  edit:boolean =  false

  
  allContact: any
  constructor(private afs: AngularFirestore, private service: ContactserviceService) { }

  saveContact(){
    // console.log(this.contact)
    this.service.saveContact('users',this.contact)
    .then(doc =>{
      doc.update({id: doc.id})
      console.log('registeration successful')
    })
    .catch(err=> console.log(err))
  }

  getAllcontacts(){
    this.allContact = this.service.getAllContacts('users')
  }

  updateContact(){
    this.service.updateContact('users', this.id, this.contact)
    .then((data)=>{
      console.log("sucessfully updated", data)
      this.edit = false
    })
    .then(()=>{
      this.contact = {name: "", phone: ""}
    })
    .catch(err => console.log(err))
  }

  deleteContact(id:string){
    this.service.deleteContact('users', id)
    .then(()=>{
      console.log('successfuly deleted')
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  editButton(id:string){
    this.id = id
    this.service.getOneContact('users', id).subscribe(res => {
      this.contact = res
    })
    this.edit  = true
  }

  cancelButton(){
    this.edit = false
    this.contact = {name: "", phone: ""}
  }




  ngOnInit(): void {
    this.getAllcontacts()
    // this.service.getAllContacts('users').subscribe(res => console.log(res))
    // this.service.deleteContact('users', 'MzFQS74Asjv8ktC8baPk').then(res => console.log(res)).catch(err => console.log(err))
    // this.saveContact()
    // this.getAllcontacts()
  }
}