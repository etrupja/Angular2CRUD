import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {IEmployee,IDepartment,IPosition} from '../shared/interfaces';
import { DataService } from '../shared/data_services/data.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MdButton } from '@angular2-material/button';
import { Location } from '@angular/common';


@Component({
    moduleId: module.id,
    selector: 'employee-new',
    templateUrl: 'employee-new.component.html'
})
export class EmployeeNewComponent implements OnInit {
    
     employees:IEmployee[];
     employeeCreated:boolean = false;
     departments:IDepartment[];
     positions:IPosition[];

    constructor(private dataService: DataService, 
                private route: ActivatedRoute,
                private location: Location) { }

    

     ngOnInit() { 
         this.positions = this.dataService.getJobPositions();
         this.dataService.getDepartments().subscribe((departments:IDepartment[])=>{
            this.departments= departments; 
            console.log('Departments loaded ');
         },
         error=>{
            console.log('Failed to load departments '+error);
         });
     }

     newEmployee(firstName:string, lastName:string, birthDate:Date, jobPosition:any, departmentId:number){
        this.dataService.createEmployee(firstName, lastName, birthDate,jobPosition,departmentId)
        .then(empl => {
            this.employees.push(empl);
        });
     }

     goBack(): void{
        this.location.back();
    }
}