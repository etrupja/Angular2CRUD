import { Component, OnInit, AfterViewInit} from '@angular/core';
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
export class EmployeeNewComponent implements OnInit, AfterViewInit {
    
     employee: IEmployee; //Object that will be sent to API
    
    //Api properties
     firstName:string;
     lastName: string;
     age: number;
     birthdate: Date;
     date: Date;
     jobPosition: string;
     departmentId:number;

     info:string = '';
     employeeCreated:boolean =false;

     departments:IDepartment[];


     

    constructor(private dataService: DataService, private route: ActivatedRoute) { }

     ngOnInit() { 
         this.dataService.getDepartments().subscribe((departments:IDepartment[])=>{
            this.departments= departments; 
            console.log('Departments loaded ');
         },
         error=>{
            console.log('Failed to load departments '+error);
         });
     }


     


     ngAfterViewInit() {
      $(document).ready(function() {
        window.setTimeout(() => {
            $('#jobPosition').material_select();
            $('#department').material_select();
            console.log("select is ready");
        },1000);
      });

       $('#department').change((e:any) => {
            this.departmentId = e.currentTarget.value;
            console.log("this.departmentId: "+ this.departmentId);
        });
        $('#jobPosition').change((e:any) => {
            this.jobPosition = e.currentTarget.value
            console.log("this.jobPosition: "+ this.jobPosition);
        });

        //datepicket
        $('.datepicker').pickadate({
            selectYears: 15, // Creates a dropdown of 15 years to control year
          });

        $('.datepicker').change((e:any) => {
             this.birthdate = e.currentTarget.value;
        });
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
                        this.info = 'Employee '+this.employee.firstName+' was created successfully. ';
                    },
                    error => {
                        console.log('Failed while trying to create the employee. '+error);
            });
     }
}