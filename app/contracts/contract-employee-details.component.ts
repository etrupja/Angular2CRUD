import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data_services/data.service';
import { IContract,IEmployee } from '../shared/interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'contract-employee-details',
    templateUrl: 'contract-employee-details.component.html'
})
export class ContractEmployeeDetailsComponent implements OnInit {
     id:number;

     employeeId:number;
     lastName: string;
     firstName: string;
     birthDate: Date;
     jobPosition: string;
     departmentName:string;

    constructor(private dataService: DataService,
                private route: ActivatedRoute,
                private location: Location) { }

    goBack(): void{
        this.location.back();
    }

    ngOnInit() {
        this.id = +this.route.snapshot.params['id'];
        this.dataService.getEmployee(this.id).subscribe((employee:IEmployee) => {
            this.lastName = employee.lastName;
            this.firstName = employee.firstName;
            this.birthDate = employee.birthDate;
            this.jobPosition = employee.jobPosition;
            this.departmentName = employee.department.name;
            Materialize.toast('Employee loaded', 3000, 'green rounded')

        },
        error => {
            Materialize.toast('Employee load failed', 3000, 'red rounded')
            console.log('Failed to load contrats'+error);
        });
     }
}