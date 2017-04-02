import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {IDepartment} from '../shared/interfaces';
import { DataService } from '../shared/data_services/data.service';
import { Location } from '@angular/common';


@Component({
    moduleId: module.id,
    selector: 'department-new',
    templateUrl: 'department-new.component.html'
})
export class DepartmentNewComponent {
     department: IDepartment;

    constructor(private dataService: DataService, 
                private route: ActivatedRoute,
                private location: Location) { }

     goBack(): void{
        this.location.back();
    }

     newDepartment(name:string, description:string){
         this.dataService.createDepartment(name,description).then(
             (ctr) =>{ console.log(ctr);}, 
             (error) => console.log(error))

     }
}