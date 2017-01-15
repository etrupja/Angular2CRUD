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
            console.log("jQuery is ready");
            $('.tooltipped').tooltip({delay: 50});
        console.log(".tooltipped is ready");
       });
    } 

     removeDepartment(id:number){
        var deleteConfirmation = confirm("Do you want to delete the department");
        //If he does not want to delete the department
        if(deleteConfirmation == false) { 
            console.log('Department is not deleted. ');
            return;
        }

        this.dataService.deleteDepartment(id)
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