import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable,throwError} from "rxjs";
import {catchError,retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CsrfService {

  getCookie(name:string) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  constructor(private httpClient : HttpClient) { }
  getCsrf():Observable<any>{
    return this.httpClient.get("http://127.0.0.1:3000/csrf")
      .pipe(
        retry(0),
        catchError(err => {
          console.log("Error"+err)
          return throwError(err)
        })
      )
  }
}
