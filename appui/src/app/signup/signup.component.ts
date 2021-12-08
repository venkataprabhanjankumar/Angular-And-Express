import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from "@angular/forms";

import {CrudService} from "../shared/crud.service";
import {CsrfService} from "../shared/csrf.service";
import {ThemePalette} from "@angular/material/core";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {

  constructor(private crudService : CrudService,private csrfService : CsrfService) { }

  csrf_token = ""
  background: ThemePalette = 'primary'

  display_success = false
  display_err = false
  err_msg = ''

  ngOnInit(): void {

    this.csrfService.getCsrf().subscribe((response)=>{
      console.log(this.csrfService.getCookie('XSRF-TOKEN'))
      this.csrf_token = this.csrfService.getCookie('XSRF-TOKEN') || '{}'
    })

  }

  UserForm = new FormGroup({
    first_name : new FormControl('',[
      Validators.required
    ]),
    last_name : new FormControl('',[
      Validators.required
    ]),
    username : new FormControl('',[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12)
    ]),
    email : new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password : new FormControl('',[
      Validators.minLength(6),
      Validators.required,
    ]),
    cpassword : new FormControl('',[
      Validators.required
    ]),
  });


  handleSubmit(event : Event){
    event.preventDefault()
    console.log(this.UserForm.value)
    this.UserForm.value['_csrf'] = this.csrf_token
    this.crudService.createUser(this.UserForm.value).subscribe((response)=>{
      console.log(JSON.parse(JSON.stringify(response))['status'])
      if(JSON.parse(JSON.stringify(response))['status']==='ok'){
        this.display_success = true
      }
      else {
        this.display_err = true
        this.err_msg = JSON.parse(JSON.stringify(response))['fail']
      }
    })
  }

}
