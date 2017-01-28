import { Component, OnInit, AfterViewInit } from '@angular/core';
import {IDepartment} from '../shared/interfaces';
import { DataService } from '../shared/data_services/data.service';
import {DepartmentEmployeesComponent} from './department-employees.component';


@Component({
    moduleId: module.id,
    selector: 'departments',
    templateUrl: 'departments.component.html'
})
export class DepartmentsComponent implements OnInit,AfterViewInit {
     departments: IDepartment[];
    departmentsFilter:IDepartment[];

     departmentId:number;
     departmentName:string;
    
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

     ngAfterViewInit() {
          $(document).ready(function() {
            $('.modal').modal();
            console.log(".modal is ready");
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

    setDepartmentData(id:number,name:string){
        this.departmentId = id;
        this.departmentName = name;
    }

     removeDepartment(){
        this.dataService.deleteDepartment(this.departmentId)
            .subscribe(() => {
                console.log('Department was deleted successfully. ');
                Materialize.toast('Department was deleted successfully', 3000, 'green rounded')
                //Reload Department after one is deleted
                this.dataService.getDepartments().subscribe((departments:IDepartment[]) => {
                        this.departments = departments;
                    },
                    error => {
                        console.log('Failed to load departments '+error);
                    });
            },
            error => {
                Materialize.toast('Failed to delete department', 3000, 'red rounded')
                console.log('Failed to delete department. '+error);
            });
     }
}