import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data_services/data.service';
import { IContract } from '../shared/interfaces';

@Component({
    moduleId: module.id,
    selector: 'contracts',
    templateUrl: 'contracts.component.html'
})
export class ContractsComponent implements OnInit {
    contracts: IContract[];
    
    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.dataService.getContracts().subscribe((contracts:IContract[]) => {
            this.contracts = contracts;
        },
        error => {
            console.log('Failed to load contrats'+error);
        });
     }


     removeContract(id:number){
        var deleteConfirmation = confirm("Do you want to delete the contract");
        //If he does not want to delete the contract
        if(deleteConfirmation == false) { 
            console.log('Contract is not deleted. ');
            return;
        }

        this.dataService.deleteContract(id)
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