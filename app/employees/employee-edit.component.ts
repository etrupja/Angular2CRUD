import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee, IEmployee,IDepartment} from '../shared/interfaces';
import { DataService } from '../shared/data_services/data.service';


@Component({
    moduleId: module.id,
    selector: 'employee-edit',
    templateUrl: 'employee-edit.component.html'
})
export class EmployeeEditComponent implements OnInit {
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
                 this.departments[dpt] ={value:departments[dpt].id,label:departments[dpt].name} 
         },
         error=>{
            console.log('Failed to load departments '+error);
         })

        this.id = +this.route.snapshot.params['id'];
        this.dataService.getEmployee(this.id).subscribe((employee:IEmployee) => {

            this.firstName = employee.firstName;
            this.lastName = employee.lastName;
            this.age = employee.age;
            this.birthDate = employee.birthDate;
            this.jobPosition = employee.jobPosition;
            this.departmentId = employee.department.name;
        },
        error => {
            console.log('Failed while trying to load the employee. '+error);
        });
     }

     parseDate(dateString: string): Date {
            if (dateString) {
                return new Date(dateString);
            } else {
                return null;
            }
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
                console.log('Employee was updated successfully. ');
            },
            error => {
                console.log('Failed while trying to update the employee. '+error);
            });
     }
}