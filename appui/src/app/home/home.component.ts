import { Component, OnInit } from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {CrudService} from "../shared/crud.service";
import {Router,ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private crudService : CrudService,public router : Router, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe((data)=>{console.log(data)})
    this.crudService.checkAuth().subscribe((response)=>{
      console.log(response)
      if(response.status === 'ok'){
        this.router.navigate(['/dashboard']).then(()=>{
          console.log("Navigating to dashboard")
        })
      }
    })
  }
  background: ThemePalette = 'primary'
}
