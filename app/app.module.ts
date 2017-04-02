import { RouterModule, Routes } from '@angular/router';


import { NgModule }      from '@angular/core'; //Used for module component
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';

//main components
import {HomeComponent} from './home/home.component'
import {EmployeesComponent} from './employees/employees.component'
import {EmployeeEditComponent} from './employees/employee-edit.component'
import {EmployeeNewComponent} from './employees/employee-new.component'

import {DepartmentsComponent} from './departments/departments.component'
import {DepartmentEmployeesComponent} from './departments/department-employees.component'
import {DepartmentEditComponent} from './departments/department-edit.component'
import {DepartmentNewComponent} from './departments/department-new.component'

import {ContractsComponent} from './contracts/contracts.component'
import {ContractEmployeeDetailsComponent} from './contracts/contract-employee-details.component'
import {ContractNewComponent} from './contracts/contract-new.component'
import {ContractEditComponent} from './contracts/contract-edit.component'

//Importing my services
import { DataService } from './shared/data_services/data.service';
import { ConfigService } from './shared/api_settings/config.service';

//routing
import {routing} from './app.routes';

@NgModule({
  imports:[ 
    BrowserModule, 
    FormsModule,
    HttpModule,
    routing
   ],
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeesComponent,EmployeeEditComponent,EmployeeNewComponent,
    DepartmentsComponent,DepartmentEmployeesComponent,DepartmentEditComponent,DepartmentNewComponent,
    ContractsComponent,ContractEmployeeDetailsComponent,ContractNewComponent,ContractEditComponent,
    ],
  bootstrap:    [ AppComponent ],
  providers:[DataService,ConfigService]
})

export class AppModule { }
