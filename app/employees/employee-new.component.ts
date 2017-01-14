import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {IEmployee,Employee,IDepartment, Department,DropDown} from '../shared/interfaces';
import { DataService } from '../shared/data_services/data.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MdButton } from '@angular2-material/button';


@Component({
    moduleId: module.id,
    selector: 'employee-new',
    templateUrl: 'employee-new.component.html'
})
export class EmployeeNewComponent implements OnInit {
    
     employee: IEmployee; //Object that will be sent to API
    
    //Api properties
     firstName:string;
     lastName: string;
     age: number;
     birthdate: Date;
     jobPosition: string;
     departmentId:number;

     info:string = '';
     employeeCreated:boolean =false;

    //Drop downs
     jobPositions: Array<any>;
     departments:Array<any>;
     
    
    constructor(private dataService: DataService, private route: ActivatedRoute) { }

    selectedJob(item:any) { this.jobPosition = item.value; } //a job position is selected
    selectedDepartment(item:any) { this.departmentId = item.value; } //A department is selected

     ngOnInit() { 
        this.jobPositions = [
                {value: 'Trainee', label: 'Trainee'},
                {value: 'Junior', label: 'Junior'},
                {value: 'Senior', label: 'Senior'},
                {value: 'Expert', label: 'Expert'},
                {value: 'Manager', label: 'Manager'}
            ];

         this.dataService.getDepartments().subscribe((departments:IDepartment[])=>{
             this.departments= []; 

            //fill departments dropdown with data
             for(var dpt in departments)
             {
                 this.departments[dpt] ={value:departments[dpt].id,label:departments[dpt].name} 
             }
         },
         error=>{
            console.log('Failed to load departments '+error);
         })
     }

     newEmployee(){
        this.employee = {
            "lastName": this.firstName,
            "firstName": this.lastName,
            "age": this.age,
            "birthDate": this.birthdate,
            "jobPosition": this.jobPosition,
            "departmentId": this.departmentId
        }

         this.dataService.createEmployee(this.employee).subscribe(
             () => {
                        console.log('Employee '+this.employee.firstName+' was created successfully. ');
                        this.employeeCreated = true;
                        this.info = 'Department '+this.employee.firstName+' was created successfully. ';
                    },
                    error => {
                        console.log('Failed while trying to create the employee. '+error);
            });
     }
}