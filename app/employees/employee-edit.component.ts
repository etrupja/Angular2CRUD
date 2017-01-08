import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee, IEmployee} from '../shared/interfaces';
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
     birthdate: Date;
     jobPosition: string;
     department:string;

     employee:Employee; 

     
    
    constructor(private dataService: DataService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.id = +this.route.snapshot.params['id'];
        this.dataService.getEmployee(this.id).subscribe((employee:IEmployee) => {

            this.firstName = employee.firstName;
            this.lastName = employee.lastName;
            this.age = employee.age;
            this.birthdate = new Date(employee.birthdate);
            this.jobPosition = employee.jobPosition;
            this.department = employee.department.name;

            alert('employee.birthdate '+employee.birthdate)

        },
        error => {
            console.log('Failed while trying to load the employee. '+error);
        });
     }

     updateEmployee(){
        this.employee = {
                            id:this.id, 
                            lastName:this.lastName,
                            firstName:this.firstName,
                            age:this.age,
                            birthdate:this.birthdate,
                            jobPosition:this.jobPosition,
                            department:this.department
                        };

        

         this.dataService.updateEmployee(this.employee)
         .subscribe(() => {
                console.log('Employee was updated successfully. ');
            },
            error => {
                console.log('Failed while trying to update the employee. '+error);
            });
     }
}