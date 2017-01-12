import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {IContract,IEmployee,IDepartment} from '../shared/interfaces';
import { DataService } from '../shared/data_services/data.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


@Component({
    moduleId: module.id,
    selector: 'contract-new',
    templateUrl: 'contract-new.component.html'
})
export class ContractNewComponent implements OnInit {
    
    contract: IContract; //Object that will be sent to API

    //Api properties
    name:string;
    startDate:Date;
    endDate:Date;
    amount:number;
    employeeId:number;

    info:string = '';
    contractCreated:boolean =false;

    //Drop downs
    employees: Array<any>;
    
    constructor(private dataService: DataService, private route: ActivatedRoute) { }

    selectedEmployee(item:any) { this.employeeId = item.value; } //a job position is selected

     ngOnInit() { 

         

         this.dataService.getEmployees().subscribe((employees:IEmployee[])=>{
             this.employees= []; 

            //fill employees dropdown with data
             for(var emp in employees)
                 this.employees[emp] ={value:employees[emp].id,label:employees[emp].firstName} 
         },
         error=>{
            console.log('Failed to load employees '+error);
         })
     }

     newContract(){
        this.contract = {
            "name": this.name,
            "startDate": this.startDate,
            "endDate": this.endDate,
            "amount": this.amount,
            "employeeId": this.employeeId
        }

         this.dataService.createContract(this.contract).subscribe(
             () => {
                        console.log('Contract '+this.contract.name+' was created successfully. ');
                        this.contractCreated = true;
                        this.info = 'Department '+this.contract.name+' was created successfully. ';
                    },
                    error => {
                        console.log('Failed while trying to create the contract. '+error);
            });
     }
}