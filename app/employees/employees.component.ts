import { Component, OnInit, AfterViewInit} from '@angular/core';
import { DataService } from '../shared/data_services/data.service';
import { IEmployee } from '../shared/interfaces';

@Component({
    moduleId: module.id,
    selector: 'employees',
    templateUrl: 'employees.component.html'
})
export class EmployeesComponent implements OnInit,AfterViewInit {
    
    employees: IEmployee[];

    employeeId:number;
    firstName: string;
    lastName:string;

    constructor(private dataService: DataService) { }

    ngOnInit() { 
        this.dataService.getEmployees().subscribe((employees:IEmployee[]) => {
            this.employees = employees;
             Materialize.toast('Employees loaded', 3000, 'green rounded')
        },
        error => {
             Materialize.toast('Failed to load employees', 3000, 'red rounded')
            console.log('Failed to load employees.'+error);
        });
    }

    ngAfterViewInit() {
      $(document).ready(function() {
        $('.modal').modal();
        console.log(".modal is ready");
      });
    } 

    setEmployeeData(id:number,fName:string,lName:string){
            this.employeeId = id;
            this.firstName = fName;
            this.lastName = lName;
        }

    removeEmployee(){
        this.dataService.deleteEmployee(this.employeeId)
            .subscribe(() => {
                console.log('Employee was deleted successfully. ');
                Materialize.toast('Employee deleted', 3000, 'green rounded')
                //Reload Employees after one is deleted
                this.dataService.getEmployees().subscribe((employees:IEmployee[]) => {
                        this.employees = employees;
                    },
                    error => {
                        console.log('Failed to load employees '+error);
                    });
            },
            error => {
                Materialize.toast('Employee deletion failed', 3000, 'red rounded')
                console.log('Failed while trying to delete the employee. '+error);
            });
     }
}