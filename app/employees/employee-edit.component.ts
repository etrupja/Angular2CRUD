import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee, IEmployee,IDepartment} from '../shared/interfaces';
import { DataService } from '../shared/data_services/data.service';


@Component({
    moduleId: module.id,
    selector: 'employee-edit',
    templateUrl: 'employee-edit.component.html'
})
export class EmployeeEditComponent implements OnInit, AfterViewInit {
     id: number;              //Identifies which department was selected
     lastName:string;
     firstName:string;
     age: number;
     birthDate: Date;
     jobPosition: string;
     department:string;
     departmentId:number;

     employee:IEmployee; 

     //Drop downs
     departments:IDepartment[];

     info:string = '';
     employeeEdited:boolean =false;

    constructor(private dataService: DataService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.id = +this.route.snapshot.params['id'];

        this.dataService.getEmployee(this.id).subscribe((employee:IEmployee) => {
            console.log('Employee loaded with success. ');
            this.firstName = employee.firstName;
            this.lastName = employee.lastName;
            this.age = employee.age;
            this.birthDate = employee.birthDate;
            this.jobPosition = employee.jobPosition;
            this.departmentId = employee.department.id;
            this.department = employee.department.name;
        },
        error => {
            console.log('Failed while trying to load the employee. '+error);
        });

        this.dataService.getDepartments().subscribe((departments:IDepartment[])=>{
             this.departments= departments; 
         },
         error=>{
            console.log('Failed to load departments '+error);
         })
     }

     ngAfterViewInit() {
      $(document).ready(function() {
        window.setTimeout(() => {
            $('#department').material_select();
            $('#department').change((e:any) => {
                console.log("department selected: "+ e.currentTarget.value);
                this.departmentId = e.currentTarget.value
            });

            $('#jobPosition').material_select();
            $('#jobPosition').change((e:any) => {
                console.log("job position selected: "+ e.currentTarget.value);
                this.jobPosition = e.currentTarget.value
            });
            console.log("select is ready");
            
        },500);

        $('.datepicker').pickadate({
            selectYears: 15, // Creates a dropdown of 15 years to control year
        });
    
        $('.datepicker').change((e:any) => {
                this.birthdate = e.currentTarget.value;
        });
      });
    } 

     updateEmployee(){
        this.employee = {
            "id":this.id,
            "lastName": this.firstName,
            "firstName": this.lastName,
            "age": this.age,
            "birthDate": this.birthDate,
            "jobPosition": this.jobPosition,
            "departmentId": this.departmentId
        }
         this.dataService.updateEmployee(this.employee)
         .subscribe(() => {
                this.employeeEdited = true;
                console.log('Employee was updated successfully. ');
                this.info = 'Employee '+this.employee.firstName+' '+this.employee.lastName+' was updated successfully!';
            },
            error => {
                console.log('Failed while trying to update the employee. '+error);
            });
     }
}