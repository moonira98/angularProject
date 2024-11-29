import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { signup, login } from '../../contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css'
})
export class LoginSignupComponent {
  isshow = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}
  signupform!: FormGroup
  loginForm!: FormGroup

  ngOnInit(): void {
    this.signupform = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })

    // loginForm
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    
    
  }


  signup() {
    this.isshow = true
  }

  login() {
    this.isshow = false
  }

  submitsignup() {
    this.http.post<signup>("http://localhost:3000/signup", this.signupform.value).subscribe((res) => {
      alert('success')
      this.signupform.reset()
    })
  }

  loginUser () {
    this.http.get<login[]>("http://localhost:3000/signup").subscribe((res) => {
    console.log(res)
      const user = res.find((a:any) => {
        console.log(this.loginForm.value.email, this.loginForm.value.password);
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      })
      console.log(user)

      if(user) {
        this.loginForm.reset()
        this.router.navigate(["/contacts"])
        localStorage.setItem('loginData', JSON.stringify(user))
      } else {
        alert('not found')
        this.loginForm.reset()
      }

    }, err => {
   
      this.loginForm.reset()
      this.router.navigate(['/server-error'])
    }
  
  )
  }

} 
