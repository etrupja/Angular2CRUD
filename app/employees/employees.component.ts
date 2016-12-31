import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data_services/data.service';
import { IEmployee } from '../shared/interfaces';

@Component({
    moduleId: module.id,
    selector: 'employees',
    templateUrl: 'employees.component.html'
})
export class EmployeesComponent implements OnInit {
    
    employees: IEmployee[];

    constructor(private dataService: DataService) { }

    ngOnInit() { 
        this.dataService.getEmployees().subscribe(
          (employees:IEmployee[]) => {
            this.employees = employees;
        },
        error => {
            console.log('Failed to load employees.'+error);
        });

    }
}