import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse,HttpHeaders} from "@angular/common/http";
import {Observable,throwError} from "rxjs";
import {catchError,retry} from "rxjs/operators";


import {CsrfService} from "./csrf.service";

export class Register{
  constructor(
    first_name : String,
    last_name : String,
    username : String,
    email : String,
    password : String,
    status : String,
    msg : String
  ) {}
}

export interface Login{
  username : String,
  password : String
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private httpClient : HttpClient,private csrfService : CsrfService) { }

  resource = "http://127.0.0.1:3000/register"

  httpHeaders = {
      headers : new HttpHeaders({
        'Content-type':'application/json'
      }),
    }


  createUser(data : Object) : Observable<Register>{
    return this.httpClient.post(this.resource,data,this.httpHeaders)
      .pipe(
        retry(1),
        catchError(err => {
          console.log("Error"+err)
          return throwError(err)
        })
      )
  }

  checkUser(data : Object):Observable<any>{
    return this.httpClient.post<Login>("http://127.0.0.1:3000/login",data,this.httpHeaders)
      .pipe(
        retry(0),
        catchError(err => {
          console.log("Error"+err)
          return throwError(err);
        })
      )
  }

  checkAuth():Observable<any>{
    return this.httpClient.get("http://127.0.0.1:3000/check_user",this.httpHeaders)
      .pipe(
        retry(0),
        catchError(err => {
          console.log(err)
          return throwError(err)
        })
      )
  }

  logout():Observable<any>{
    return this.httpClient.get("http://127.0.0.1:3000/logout",this.httpHeaders)
      .pipe(
        retry(0),
        catchError(err => {
          console.log(err)
          return throwError(err)
        })
      )
  }

  delete_acc():Observable<any>{
    return this.httpClient.delete("http://127.0.0.1:3000/delete",this.httpHeaders)
      .pipe(
        retry(0),
        catchError(err => {
          console.log(err)
          return throwError(err);
        })
      )
  }

}
