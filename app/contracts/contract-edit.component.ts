import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IEmployee,IContract} from '../shared/interfaces';
import { DataService } from '../shared/data_services/data.service';
import {Location} from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'contract-edit',
    templateUrl: 'contract-edit.component.html'
})
export class ContractEditComponent implements OnInit,AfterViewInit {
     id: number;              //Identifies which contract was selected
     name:string;
     amount: number;
     startDate: Date;
     endDate: Date;
     employeeId:number;
     employees:IEmployee[];
     employee:IEmployee; //This is used for the seleced employee

     info:string = '';
     contractEdited:boolean =false;

     contract:IContract; //this will be sent to the API
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

     ngAfterViewInit() {
      $(document).ready(function() {
        window.setTimeout(() => {
            $('#employee').material_select();
            console.log("select is ready");
        },500);

        $('#startDate').pickadate({
            selectYears: 15
        });
        
         $('#endDate').pickadate({
            selectYears: 15
        });
        
      });
      $('#startDate').change((e:any) => {
                this.startDate = e.currentTarget.value;
        });
       $('#endDate').change((e:any) => {
               this.endDate = e.currentTarget.value;
       });
       $('#employee').change((e:any) => {
                this.employeeId = e.currentTarget.value
            });
    } 

     updateContract(){
        console.log('contract name: '+this.name);
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
                this.info = 'Contract '+this.contract.name+' was edited successfully';
                Materialize.toast('Contract edited', 3000, 'green rounded')
            },
            error => {
                Materialize.toast('Contract edit failed', 3000, 'red rounded')
                console.log('Failed while trying to update the contract. '+error);
            });
     }
}