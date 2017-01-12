import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { HomeComponent } from './home/home.component';

//Department related components
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentEmployeesComponent } from './departments/department-employees.component';
import { DepartmentEditComponent } from './departments/department-edit.component';
import { DepartmentNewComponent } from './departments/department-new.component';

import { EmployeesComponent } from './employees/employees.component';
import { EmployeeEditComponent } from './employees/employee-edit.component';
import { EmployeeNewComponent } from './employees/employee-new.component';

import {ContractsComponent} from './contracts/contracts.component';
import {ContractEmployeeDetailsComponent} from './contracts/contract-employee-details.component';
 
const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'departments', component: DepartmentsComponent },
    { path: 'department-employees/:id', component: DepartmentEmployeesComponent },
    { path: 'department-edit/:id', component: DepartmentEditComponent },
    { path: 'department-new', component: DepartmentNewComponent },
    { path: 'employees', component: EmployeesComponent },
    { path: 'employee-edit/:id', component: EmployeeEditComponent },
    { path: 'employee-new', component: EmployeeNewComponent },
    { path: 'contracts', component: ContractsComponent },
    { path: 'contract-employee-details/:id', component: ContractEmployeeDetailsComponent },
    { path: '', component: HomeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);