import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {IDepartment,IEmployee} from '../shared/interfaces';
import { DataService } from '../shared/data_services/data.service';


@Component({
    moduleId: module.id,
    selector: 'department-employees',
    templateUrl: 'department-employees.component.html'
})
export class DepartmentEmployeesComponent implements OnInit {
     employees: IEmployee[];
     id: number;
    
    constructor(private dataService: DataService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.id = +this.route.snapshot.params['id']
        this.dataService.getDepartmentEmployees(this.id).subscribe((employees:IEmployee[]) => {
            this.employees = employees;
        },
        error => {
            console.log('Failed while trying to load Employees of department. '+error);
        });
     }
}