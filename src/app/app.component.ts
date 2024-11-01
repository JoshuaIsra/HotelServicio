import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavarComponent } from "./components/navar/navar.component";
import { ApiService } from './services/api.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavarComponent,RouterModule, CommonModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title : string = 'HotelService';
  
  constructor(private habitacionService :ApiService) { }
  ngOnInit() :void{
    
    
  }

  

}
