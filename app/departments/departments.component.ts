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
     departmentId:number;
     departmentName:string;
    
    constructor(private dataService: DataService) { }
    ngOnInit() {
        this.dataService.getDepartments().subscribe((departments:IDepartment[]) => {
            this.departments = departments;
        },
        error => {
            console.log('Failed to load departments '+error);
        });
     }

     ngAfterViewInit() {
          $(document).ready(function() {
            $('.modal').modal();
            console.log(".modal is ready");
       });
    } 

    setDepartmentData(id:number,name:string){
        this.departmentId = id;
        this.departmentName = name;
    }

     removeDepartment(){
        this.dataService.deleteDepartment(this.departmentId)
            .subscribe(() => {
                console.log('Department was deleted successfully. ');
                //Reload Department after one is deleted
                this.dataService.getDepartments().subscribe((departments:IDepartment[]) => {
                        this.departments = departments;
                    },
                    error => {
                        console.log('Failed to load departments '+error);
                    });
            },
            error => {
                console.log('Failed while trying to update the department. '+error);
            });
     }
}