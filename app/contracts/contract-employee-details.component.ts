import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data_services/data.service';
import { IContract,IEmployee } from '../shared/interfaces';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'contract-employee-details',
    templateUrl: 'contract-employee-details.component.html'
})
export class ContractEmployeeDetailsComponent implements OnInit {
     id:number;
     lastName: string;
     firstName: string;
     age: number;
     birthDate: Date;
     jobPosition: string;
     departmentName:string;

    constructor(private dataService: DataService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.id = +this.route.snapshot.params['id'];
        this.dataService.getEmployee(this.id).subscribe((employee:IEmployee) => {
            this.lastName = employee.lastName;
            this.firstName = employee.firstName;
            this.age = employee.age;
            this.birthDate = employee.birthDate;
            this.jobPosition = employee.jobPosition;
            this.departmentName = employee.department.name;

        },
        error => {
            console.log('Failed to load contrats'+error);
        });
     }
}