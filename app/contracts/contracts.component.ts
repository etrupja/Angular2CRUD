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
    contractsFilter: IContract[];
    selectedContract:IContract;
    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.dataService.getContracts().subscribe((contracts:IContract[]) => {
            this.contracts = contracts;
            this.contractsFilter = contracts;
            Materialize.toast('Contracts loaded', 3000, 'green rounded')
        },
        error => {
            Materialize.toast('Failed to load contracts', 3000, 'red rounded')
        });
     }

    filterContracts(filter:string){
        console.log(filter);
        if(filter.length == 0){
            this.contracts = this.contractsFilter;
        }else{
            this.contracts = this.contractsFilter.filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) > -1 )
        }
    }


     removeContract(contract:IContract){
         this.selectedContract = contract;
        this.dataService.deleteContract(this.selectedContract.id)
            .subscribe(() => {
                Materialize.toast('Contract deleted', 3000, 'green rounded')
                //Reload Contracts after one is deleted
                this.dataService.getContracts().subscribe((contracts:IContract[]) => {
                        this.contracts = contracts;
                    },
                    error => {
                        console.log('Failed to load contracts '+error);
                    });
            },
            error => {
                Materialize.toast('Contract deletion failed', 3000, 'red rounded')
            });
     }
}