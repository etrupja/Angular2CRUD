import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {IContract,IEmployee,IDepartment} from '../shared/interfaces';
import { DataService } from '../shared/data_services/data.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'contract-new',
    templateUrl: 'contract-new.component.html'
})
export class ContractNewComponent implements OnInit {
    
    contract: IContract; //Object that will be sent to API
    contracts:IContract[];
    info:string = '';
    contractCreated:boolean =false;

    //Drop downs
    employees: IEmployee[];
    
    constructor(private dataService: DataService, 
                private route: ActivatedRoute,
                private location: Location) { }

    goBack(): void{
        this.location.back();
    }


     ngOnInit() { 
         this.dataService.getEmployees().subscribe((employees:IEmployee[])=>{
             this.employees= employees; 
         },
         error=>{
            console.log('Failed to load employees '+error);
         })
     }

     newContract(name:string, startDate:Date, endDate:Date,amount:number, employeeId:number){
         this.dataService.createContract(name, startDate, endDate,amount, employeeId).then(ctr => {
            this.contracts.push(ctr);
        });
     }
}