import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {IContract,IEmployee,IDepartment} from '../shared/interfaces';
import { DataService } from '../shared/data_services/data.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


@Component({
    moduleId: module.id,
    selector: 'contract-new',
    templateUrl: 'contract-new.component.html'
})
export class ContractNewComponent implements OnInit,AfterViewInit {
    
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
    employees: IEmployee[];
    
    constructor(private dataService: DataService, private route: ActivatedRoute) { }

    selectedEmployee(item:any) { this.employeeId = item.value; } //a job position is selected

     ngOnInit() { 
         this.dataService.getEmployees().subscribe((employees:IEmployee[])=>{
             this.employees= employees; 
         },
         error=>{
            console.log('Failed to load employees '+error);
         })
     }

     ngAfterViewInit() {
      $(document).ready(function() {
        window.setTimeout(() => {
            $('#employee').material_select();
            console.log("select is ready");
        },1000);
      });

       $('#employee').change((e:any) => {
            this.employeeId = e.currentTarget.value;
            console.log("this.employeeId: "+ this.employeeId);
        });

        //datepicket
        $('#startDate').pickadate({
            selectYears: 15, 
          });
        $('#endDate').pickadate({
            selectYears: 15,
        });

        $('#startDate').change((e:any) => {
             this.startDate = e.currentTarget.value;
        });

        $('#endDate').change((e:any) => {
             this.endDate = e.currentTarget.value;
        });
    }

     newContract(){
        console.log('startDate '+this.startDate);
        console.log('endDate '+this.endDate);

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