import { RouterModule, Routes } from '@angular/router';


import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';

//main components
import {HomeComponent} from './home/home.component'
import {EmployeesComponent} from './employees/employees.component'
import {DepartmentsComponent} from './departments/departments.component'
import {ContractsComponent} from './contracts/contracts.component'


//routing
import {routing} from './app.routes';

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
   ],
  declarations: [ 
    AppComponent,
    HomeComponent,
    EmployeesComponent,
    DepartmentsComponent,
    ContractsComponent
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
