import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact, contactus } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  getContacts() {
    return this.http.get<Contact[]>("http://localhost:3000/posts")
  }

  getData(id: any) {
    return this.http.get<Contact>("http://localhost:3000/posts/" + id)
  }

  delete(id: any) {
    return this.http.delete<Contact>("http://localhost:3000/posts/" + id)
  }

  addContact(post: any) {
    return this.http.post<Contact>("http://localhost:3000/posts", post)
  }

  update(data: any) {
    return this.http.post<Contact>("http://localhost:3000/posts", data)
  }

  contactus (data: contactus) {
    return this.http.post<contactus>("http://localhost:3000/contactus", data)
  }

}
