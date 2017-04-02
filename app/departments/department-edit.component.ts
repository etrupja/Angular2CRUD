import { Component, OnInit,Input } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router';
import {IDepartment} from '../shared/interfaces';
import { DataService } from '../shared/data_services/data.service';
import { Location } from '@angular/common';


@Component({
    moduleId: module.id,
    selector: 'department-edit',
    templateUrl: 'department-edit.component.html'
})
export class DepartmentEditComponent implements OnInit {
     id: number;              //Identifies which department was selected
     name:string;
     description: string;
     department:IDepartment;
     _mydepartment:IDepartment;
     info:string = '';
     departmentEdited:boolean = false;


     @Input() myDepartment: IDepartment;
    
    constructor(private dataService: DataService,
                private route: ActivatedRoute,
                private location: Location) { }


    goBack(): void{
        this.location.back();
    }

    ngOnInit() {
        this.id = +this.route.snapshot.params['id'];
        
        // this.route.params
        //     .switchMap((params: Params) => this.dataService.getDepartment(this.id))
        //     .subscribe(department => {
        //             this._mydepartment = department
        //             alert(JSON.stringify(this._mydepartment));
        //     });


        this.dataService.getDepartment(this.id).subscribe((department:IDepartment) => {
            this._mydepartment = department;
            console.log(JSON.stringify(this._mydepartment));
            
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
                this.departmentEdited = true;
                console.log('Department was updated successfully. ');
                this.info = 'Department '+this.department.name+ ' was edited successfully!';
            },
            error => {
                console.log('Failed while trying to update the department. '+error);
            });

     }

     
}