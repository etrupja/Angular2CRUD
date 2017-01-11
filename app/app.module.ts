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

import {MdCardModule} from '@angular2-material/card'
import {MdButtonModule} from '@angular2-material/button'
import {MdIconModule} from '@angular2-material/icon'
import {MdMenuModule} from '@angular2-material/menu'
import {MdButtonToggleModule} from '@angular2-material/button-toggle'
import {MdCheckboxModule} from '@angular2-material/checkbox'
import {MdGridListModule} from '@angular2-material/grid-list';
import {MdInputModule} from '@angular2-material/input';
import {MdListModule} from '@angular2-material/list';
import {MdProgressBarModule} from '@angular2-material/progress-bar';
import {MdProgressCircleModule} from '@angular2-material/progress-circle';
import {MdRadioModule} from '@angular2-material/radio';
import {MdSidenavModule} from '@angular2-material/sidenav';
import {MdSliderModule} from '@angular2-material/slider';
import {MdSlideToggleModule} from '@angular2-material/slide-toggle';
import {MdTabsModule} from '@angular2-material/tabs';
import {MdToolbarModule} from '@angular2-material/toolbar';
import {MdTooltipModule} from '@angular2-material/tooltip';
import {MdIconRegistry} from '@angular2-material/icon';

//Select module
import {SelectModule} from 'angular2-select';

//Importing my services
import { DataService } from './shared/data_services/data.service';
import { ConfigService } from './shared/api_settings/config.service';

//routing
import {routing} from './app.routes';

@NgModule({
  imports:      [ 
    BrowserModule, 
    MdCardModule, MdButtonModule, MdIconModule,MdMenuModule,MdButtonToggleModule,MdCheckboxModule,MdGridListModule,MdInputModule,MdListModule,MdProgressBarModule,
    MdProgressCircleModule,MdRadioModule,MdSidenavModule,MdSliderModule,MdSlideToggleModule,MdTabsModule,MdToolbarModule,MdTooltipModule,
    FormsModule,SelectModule,
    HttpModule,
    routing
   ],
  declarations: [ 
    AppComponent,
    HomeComponent,
    EmployeesComponent,EmployeeEditComponent,EmployeeNewComponent,
    DepartmentsComponent,DepartmentEmployeesComponent,DepartmentEditComponent,DepartmentNewComponent,
    ContractsComponent
    ],
  bootstrap:    [ AppComponent ],
  providers:[MdIconRegistry, DataService,ConfigService]
})

export class AppModule { }
