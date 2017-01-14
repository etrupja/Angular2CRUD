import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IEmployee,IContract} from '../shared/interfaces';
import { DataService } from '../shared/data_services/data.service';


@Component({
    moduleId: module.id,
    selector: 'contract-edit',
    templateUrl: 'contract-edit.component.html'
})
export class ContractEditComponent implements OnInit {
     id: number;              //Identifies which contract was selected
     name:string;
     amount: number;
     startDate: Date;
     endDate: Date;
     employeeId:number;

     employees:Array<any>;

     info:string = '';
     contractEdited:boolean =false;

    contract:IContract; //this will be sent to the API
    constructor(private dataService: DataService, private route: ActivatedRoute) { }

    selectedEmployee(item:any) { this.employeeId = item.value; } //An employee is selected

    ngOnInit() {

        this.dataService.getEmployees().subscribe((employees:IEmployee[])=>{
             this.employees= []; 

            //fill employees dropdown with data
             for(var emp in employees)
                 this.employees[emp] ={value:employees[emp].id,label:employees[emp].firstName +' '+employees[emp].lastName } 
         },
         error=>{
            console.log('Failed to load employees '+error);
         })

        this.id = +this.route.snapshot.params['id'];
        this.dataService.getContract(this.id).subscribe((contract:IContract) => {

            this.name = contract.name;
            this.amount = contract.amount;
            this.startDate= contract.startDate;
            this.endDate= contract.endDate;
            this.employeeId = contract.employeeId;
        },
        error => {
            console.log('Failed while trying to load the contract. '+error);
        });
     }

     parseDate(dateString: string): Date {
            if (dateString) {
                return new Date(dateString);
            } else {
                return null;
            }
        }

     updateContract(){
        this.contract = {
            "id":this.id,
            "name": this.name,
            "amount": this.amount,
            "startDate": this.startDate,
            "endDate": this.endDate,
            "employeeId": this.employeeId
        }
         this.dataService.updateContract(this.contract)
         .subscribe(() => {
                this.contractEdited = true;
                console.log('Contract was updated successfully. ');
                this.info = 'Contract '+this.contract.name+' was edited successfully';
            },
            error => {
                console.log('Failed while trying to update the contract. '+error);
            });
     }
}