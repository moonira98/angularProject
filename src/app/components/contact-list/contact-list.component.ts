import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { Contact } from '../../contact';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../filter.pipe';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormsModule, FilterPipe],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  data: Contact[] = []
  addForm!: FormGroup
  editForm!: FormGroup
  contactusForm!: FormGroup
  searchText: any;
  public contactData: Contact = {} as Contact;
   
  constructor(private api: ApiService, private fb: FormBuilder) {}

   ngOnInit(): void {
    this.getContacts()

    this.addForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      city: ['', Validators.required],
    })

    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      city: ['', Validators.required],
    })

    this.contactusForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required],
    })

    
   }

   getContacts() {
    this.api.getContacts().subscribe((res: Contact[]) => {
      this.data = res
    })
   }

   getData(id: any) {
      this.api.getData(id).subscribe((res: any) => {
        console.log(res)
        this.contactData = res

        this.editForm.patchValue({
          id: this.contactData.id,
          firstName: this.contactData.firstName,
          lastName: this.contactData.lastName,
          phoneNumber: this.contactData.phoneNumber,
          city: this.contactData.city,
        })
      })
   }


   delete(id: any) {
    this.api.delete(id).subscribe((res) => {
      alert('deleted')
      this.getContacts()
    })
   }

   addContact(data: any) {
    this.api.addContact(data).subscribe((res) => {
        this.getContacts()
    })
   }

   update() {
      const formValue = this.editForm.value
      const dataToSend = {
        id: formValue.id,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        phoneNumber: formValue.phoneNumber,
        city: formValue.city
      }
    
    
    this.api.update(dataToSend).subscribe((res) => {
        this.getContacts()
      })
   }

   logOut() {
    localStorage.removeItem('loginData')
   }

   contactussubmit() {
    this.api.contactus(this.contactusForm.value).subscribe((res) => {
      alert('good')
      this.contactusForm.reset()
    })
   }

   
}
