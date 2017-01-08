import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {IDepartment, Department} from '../shared/interfaces';
import { DataService } from '../shared/data_services/data.service';


@Component({
    moduleId: module.id,
    selector: 'department-edit',
    templateUrl: 'department-edit.component.html'
})
export class DepartmentEditComponent implements OnInit {
     id: number;              //Identifies which department was selected
     name:string;
     description: string;

    department:Department;

     
    
    constructor(private dataService: DataService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.id = +this.route.snapshot.params['id'];
        this.dataService.getDepartment(this.id).subscribe((department:IDepartment) => {

            this.name = department.name;
            this.description = department.description;
        },
        error => {
            console.log('Failed while trying to load the department. '+error);
        });
     }

     updateDepartment(){
        this.department = {id:this.id, name:this.name,description:this.description};

         this.dataService.updateDepartment(this.department)
         .subscribe(() => {
                console.log('Department was updated successfully. ');
            },
            error => {
                console.log('Failed while trying to update the department. '+error);
            });

     }

     
}