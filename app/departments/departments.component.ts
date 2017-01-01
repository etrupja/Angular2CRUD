import { Component, OnInit } from '@angular/core';
import {IDepartment} from '../shared/interfaces';
import { DataService } from '../shared/data_services/data.service';
import {DepartmentEmployeesComponent} from './department-details.component';


@Component({
    moduleId: module.id,
    selector: 'departments',
    templateUrl: 'departments.component.html'
})
export class DepartmentsComponent implements OnInit {
     departments: IDepartment[];
    
    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.dataService.getDepartments().subscribe((departments:IDepartment[]) => {
            this.departments = departments;
        },
        error => {
            console.log('Failed to load departments '+error);
        });
     }
}