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

    removeEmployee(id:number){
        var deleteConfirmation = confirm("Do you want to delete the employee");
        //If he does not want to delete the employee
        if(deleteConfirmation == false) { 
            console.log('Employee is not deleted. ');
            return;
        }

        this.dataService.deleteEmployee(id)
            .subscribe(() => {
                console.log('Employee was deleted successfully. ');

                //Reload Employees after one is deleted
                this.dataService.getEmployees().subscribe((employees:IEmployee[]) => {
                        this.employees = employees;
                    },
                    error => {
                        console.log('Failed to load employees '+error);
                    });
            },
            error => {
                console.log('Failed while trying to delete the employee. '+error);
            });
     }
}