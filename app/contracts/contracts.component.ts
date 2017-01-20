import { Component, OnInit,AfterViewInit } from '@angular/core';
import { DataService } from '../shared/data_services/data.service';
import { IContract } from '../shared/interfaces';

@Component({
    moduleId: module.id,
    selector: 'contracts',
    templateUrl: 'contracts.component.html'
})
export class ContractsComponent implements OnInit,AfterViewInit {
    contracts: IContract[];
    contractId:number;
    contractName:string;

    dataLoaded:boolean=false; //this is used for te spiner

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.dataService.getContracts().subscribe((contracts:IContract[]) => {
            this.contracts = contracts;
            console.log('contracts loaded')
            this.dataLoaded = true;
        },
        error => {
            console.log('Failed to load contrats'+error);
        });
     }

      ngAfterViewInit() {
          $(document).ready(function() {
            $('.modal').modal();
            console.log(".modal is ready");
       });
    } 

    setContractData(id:number,name:string){
        this.contractId = id;
        this.contractName = name;
    }


     removeContract(){
        this.dataService.deleteContract(this.contractId)
            .subscribe(() => {
                console.log('Contract was deleted successfully. ');
                //Reload Contracts after one is deleted
                this.dataService.getContracts().subscribe((contracts:IContract[]) => {
                        this.contracts = contracts;
                    },
                    error => {
                        console.log('Failed to load contracts '+error);
                    });
            },
            error => {
                console.log('Failed while trying to update the contracts. '+error);
            });
     }
}