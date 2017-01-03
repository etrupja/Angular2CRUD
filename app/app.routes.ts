import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { HomeComponent } from './home/home.component';

import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentEmployeesComponent } from './departments/department-employees.component';
import { DepartmentEditComponent } from './departments/department-edit.component';

import { EmployeesComponent } from './employees/employees.component';
import {ContractsComponent} from './contracts/contracts.component';
 
const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'departments', component: DepartmentsComponent },
    { path: 'department-employees/:id', component: DepartmentEmployeesComponent },
    { path: 'department-edit/:id', component: DepartmentEditComponent },
    { path: 'employees', component: EmployeesComponent },
    { path: 'contracts', component: ContractsComponent },
    { path: '', component: HomeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);