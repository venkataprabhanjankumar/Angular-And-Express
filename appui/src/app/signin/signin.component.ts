import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";


import {CrudService} from "../shared/crud.service";
import {CsrfService} from "../shared/csrf.service";
import {HttpHeaders} from "@angular/common/http";
import {ThemePalette} from "@angular/material/core";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private crudService : CrudService,private csrfService : CsrfService,public router : Router) { }

  background: ThemePalette = 'primary'
  display_err = false
  err_msg = ''
  csrf_token = ""

  ngOnInit(): void {
    this.csrfService.getCsrf().subscribe((response)=>{
      console.log(this.csrfService.getCookie('XSRF-TOKEN'))
      this.csrf_token = this.csrfService.getCookie('XSRF-TOKEN') || '{}'
      const headers = new HttpHeaders({
          'Content-Type':  'application/json',
          //'X-XSRF-TOKEN':this.csrfService.getCookie('XSRF-TOKEN') || '{}'
      })
    })
  }

  LoginForm = new FormGroup({
    //_csrf : new FormControl(this.csrfService.getCookie('XSRF-TOKEN')),
    username : new FormControl('',[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12)
    ]),
    password : new FormControl('',[
      Validators.minLength(6),
      Validators.required,
    ]),
  });

  handleSubmit(event : Event){
    event.preventDefault()
    this.LoginForm.value['_csrf'] = this.csrf_token
    console.log(this.LoginForm.value)
    this.crudService.checkUser(this.LoginForm.value).subscribe((response)=>{
      if(JSON.parse(JSON.stringify(response))['status']==='ok'){
        this.router.navigate(['/dashboard']).then(()=>{
          console.log("Navigating to dashboard")
        })
      }
      else {
        this.display_err = true
        this.err_msg = JSON.parse(JSON.stringify(response))['err_msg']
      }
    })
  }

}
