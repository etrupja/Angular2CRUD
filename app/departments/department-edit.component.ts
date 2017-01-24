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
     info:string = '';
     departmentEdited:boolean = false;
    
    constructor(private dataService: DataService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.id = +this.route.snapshot.params['id'];
        this.dataService.getDepartment(this.id).subscribe((department:IDepartment) => {

            this.name = department.name;
            this.description = department.description;

            Materialize.toast('Department loaded', 3000, 'green rounded')
        },
        error => {
            Materialize.toast('Department load failed', 3000, 'red rounded')
            console.log('Failed while trying to load the department. '+error);
        });
     }

     updateDepartment(){
        this.department = {id:this.id, name:this.name,description:this.description};

         this.dataService.updateDepartment(this.department)
         .subscribe(() => {
                this.departmentEdited = true;
                console.log('Department was updated successfully. ');
                this.info = 'Department '+this.department.name+ ' was edited successfully!';
                Materialize.toast('Department updated', 3000, 'green rounded')
            },
            error => {
                Materialize.toast('Department update failed', 3000, 'red rounded')
                console.log('Failed while trying to update the department. '+error);
            });

     }

     
}