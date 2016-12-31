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
}