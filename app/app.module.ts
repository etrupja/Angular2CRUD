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


import {MdCardModule} from '@angular2-material/card'
import {MdButtonModule} from '@angular2-material/button'
import {MdIconModule} from '@angular2-material/icon'

import {MdIconRegistry} from '@angular2-material/icon'

//routing
import {routing} from './app.routes';

@NgModule({
  imports:      [ 
    BrowserModule, MdCardModule, MdButtonModule, MdIconModule,
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
  bootstrap:    [ AppComponent ],
  providers:[MdIconRegistry]
})

export class AppModule { }
