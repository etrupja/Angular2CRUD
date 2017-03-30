import { Component, OnInit } from '@angular/core';
import {IDepartment} from '../shared/interfaces';
import { DataService } from '../shared/data_services/data.service';
import {DepartmentEmployeesComponent} from './department-employees.component';


@Component({
    moduleId: module.id,
    selector: 'departments',
    templateUrl: 'departments.component.html'
})
export class DepartmentsComponent implements OnInit {
     departments: IDepartment[];
     departmentsFilter:IDepartment[];
     selectedDepartment: IDepartment;
    
    constructor(private dataService: DataService) { }
    ngOnInit() {
        this.dataService.getDepartments().subscribe((departments:IDepartment[]) => {
            this.departments = departments;
            this.departmentsFilter = departments;
             Materialize.toast('Departments loaded', 3000, 'green rounded')
        },
        error => {
            Materialize.toast('Failed to load departments', 3000, 'red rounded')
            console.log('Failed to load departments '+error);
        });
     }

    filterDepartments(filter:string){
        console.log(filter);
        if(filter.length == 0){
            this.departments = this.departmentsFilter;
        }else{
            this.departments = this.departmentsFilter.filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) > -1 )
        }
    }

     removeDepartment(department: IDepartment): void{
         this.selectedDepartment = department;
        this.dataService.deleteDepartment(this.selectedDepartment.id)
            .subscribe(() => {
                Materialize.toast('Department was deleted successfully', 3000, 'green rounded')
                this.dataService.getDepartments().subscribe((departments:IDepartment[]) => {
                        this.departments = departments;
                    },
                    error => {
                        console.log('Failed to load departments '+error);
                    });
            },
            error => {
                Materialize.toast('Department you want to delete has employees assigned.', 3000, 'red rounded')
            });
     }
}