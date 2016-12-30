import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { HomeComponent } from './home/home.component';
import { DepartmentsComponent } from './departments/departments.component';
import { EmployeesComponent } from './employees/employees.component';
import {ContractsComponent} from './contracts/contracts.component';
 
const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'departments', component: DepartmentsComponent },
    { path: 'employees', component: EmployeesComponent },
    { path: 'contracts', component: ContractsComponent },
    { path: '', component: HomeComponent }
];
 
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);