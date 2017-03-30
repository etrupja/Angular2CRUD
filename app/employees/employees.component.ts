import { Component, OnInit} from '@angular/core';
import { DataService } from '../shared/data_services/data.service';
import { IEmployee } from '../shared/interfaces';

@Component({
    moduleId: module.id,
    selector: 'employees',
    templateUrl: 'employees.component.html'
})
export class EmployeesComponent implements OnInit {
    
    employees: IEmployee[];
    employeesFilter: IEmployee[] //used for filtering
    selectedEmployee: IEmployee;

    constructor(private dataService: DataService) { }

    ngOnInit() { 
        this.dataService.getEmployees().subscribe((employees:IEmployee[]) => {
            this.employees = employees;
            this.employeesFilter = employees; 
             Materialize.toast('Employees loaded', 3000, 'green rounded')
        },
        error => {
             Materialize.toast('Failed to load employees', 3000, 'red rounded')
            console.log('Failed to load employees.'+error);
        });
    }

    onSelect(employee:IEmployee):void{
        this.selectedEmployee = employee;
    }

    filterEmployees(filter:string){
        console.log(filter);
        if(filter.length == 0){
            this.employees = this.employeesFilter;
        }else{

            this.employees = this.employeesFilter.filter(item => item.firstName.toLowerCase().indexOf(filter.toLowerCase()) > -1 || 
                                                         item.lastName.toLowerCase().indexOf(filter.toLowerCase()) > -1 )
        }
    }


    filterByFirstOrLastName(filterString:string){
        this.employees = this.employees.filter(filter=>filter.firstName == filterString)
    }

    removeEmployee(employee:IEmployee):void {
        this.selectedEmployee = employee;
        this.dataService.deleteEmployee(this.selectedEmployee.id)
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