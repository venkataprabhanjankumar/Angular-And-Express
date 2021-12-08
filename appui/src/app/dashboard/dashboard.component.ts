import { Component, OnInit } from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {Router} from "@angular/router";


import {CrudService} from "../shared/crud.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private crudService : CrudService,public router : Router) { }

  background : ThemePalette = 'primary'

  ngOnInit(): void {
    this.crudService.checkAuth().subscribe((response)=>{
      console.log(response)
      if(response.status === 'ok'){
      }
      else {
        this.router.navigate(['/home']).then(()=>{
          console.log("Navigating to dashboard")
        })
      }
    })
  }

  handle_logout(event :Event){
    event.preventDefault()
    this.crudService.logout().subscribe((result)=>{
      console.log(result)
      this.router.navigate(['/home']).then(()=>{
        console.log("Logout")
      })
    })
  }

  handle_delete(event : Event){
    event.preventDefault()
    this.crudService.delete_acc().subscribe((result)=>{
      if(result.status === 'ok'){
        this.router.navigate(['/home']).then(()=>{
          console.log("Delete")
        })
      }
    })
  }

}
