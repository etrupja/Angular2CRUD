import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { 
    IEmployee, 
    IDepartment, 
    IContract,
    IPosition} from '../interfaces';
import { ConfigService } from '../api_settings/config.service';

@Injectable()
export class DataService {

    private headers = new Headers({'Content-Type': 'application/json'});

    _baseUrl: string = '';

    constructor(private http: Http,
        private configService: ConfigService) {
        this._baseUrl = configService.getApiURI();
    }

//************************************************************   DEPARTMENT SERVICES ************************************************************************ /

    //get all Departments 
    getDepartments(): Observable<IDepartment[]> {
        return this.http.get(this._baseUrl + 'department')
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

//get a specific department by Id
    getDepartment(id: number): Observable<IDepartment> {
        return this.http.get(this._baseUrl + 'department/' + id )
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

//get department's employees
    getDepartmentEmployees(id: number): Observable<IEmployee[]> {
        return this.http.get(this._baseUrl + 'department/' + id + '/employees')
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }
    
//create a new Department
    createDepartment(department: IDepartment): Observable<IDepartment> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this._baseUrl + 'department/', JSON.stringify(department), {
            headers: headers
        })
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

//updates a department
    updateDepartment(department: IDepartment): Observable<void> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');

        return this.http.put(this._baseUrl + 'department/' + department.id, JSON.stringify(department), {
            headers: headers
        })
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }

//delete department
    deleteDepartment(id: number): Observable<void> {
        return this.http.delete(this._baseUrl + 'department/' + id)
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }
//************************************************************   EMPLOYEE SERVICES ************************************************************************ /
//get all employees
getEmployees(): Observable<IEmployee[]> {
        return this.http.get(this._baseUrl + 'employee')
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

//get single employee using Id
getEmployee(id: number): Observable<IEmployee> {
        return this.http.get(this._baseUrl + 'employee/' + id)
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    //create a new Employee
createEmployee(firstName:string, lastName:string, birthDate:Date, jobPosition:any, departmentId:number): Promise<IEmployee> {
    let body = JSON.stringify({firstName:firstName, 
                                lastName:lastName, 
                                birthDate:birthDate, 
                                jobPosition:jobPosition, 
                                departmentId:departmentId});

    return this.http.post(this._baseUrl + 'employee/', body, {headers: this.headers })
        .toPromise()
        .then(res => res.json().data as IEmployee)
        .catch(this.handleError);
}

//updates an employee
    updateEmployee(employee: IEmployee): Observable<void> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');

        return this.http.put(this._baseUrl + 'employee/' + employee.id, JSON.stringify(employee), {
            headers: headers
        })
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }

//delete department
    deleteEmployee(id: number): Observable<void> {
        return this.http.delete(this._baseUrl + 'employee/' + id)
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }

//************************************************************   CONTRACT SERVICES ************************************************************************ /
//get all contracts
getContracts(): Observable<IContract[]> {
        return this.http.get(this._baseUrl + 'contract')
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }
//get single contract
getContract(id: number): Observable<IContract> {
        return this.http.get(this._baseUrl + 'contract/' + id)
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }


//delete contract
    deleteContract(id: number): Observable<void> {
        return this.http.delete(this._baseUrl + 'contract/' + id)
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }


    //create a new Contract
createContract(name:string, startDate:Date, endDate:Date,amount:number, employeeId:number): Promise<IContract> {
    let contract = JSON.stringify({
                                    name:name,
                                    startDate:startDate,
                                    endDate:endDate,
                                    amount:amount,
                                    employeeId:employeeId
                                });

    return this.http.post(this._baseUrl + 'contract/', contract, { headers: this.headers})
                .toPromise()
                .then(res => res.json().date as IContract)
                .catch(this.handleError);
}

//updates a contract
    updateContract(contract: IContract): Observable<void> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');

        return this.http.put(this._baseUrl + 'contract/' + contract.id, JSON.stringify(contract), {
            headers: headers
        })
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }



//get all jobPositions

getJobPositions(){
    let positions:IPosition[] = [
      {name: 'Trainee', description: 'Trainee'},
      {name: 'Junior', description: 'Junior'},
      {name: 'Senior', description: 'Senior'},
      {name: 'Expert', description: 'Expert'},
      {name: 'Manager', description: 'Manager'}
    ];
    return positions;
  }



    private handleError(error: any) {
        var applicationError = error.headers.get('Application-Error');
        var serverError = error.json();
        var modelStateErrors: string = '';

        if (!serverError.type) {
            console.log(serverError);
            for (var key in serverError) {
                if (serverError[key])
                    modelStateErrors += serverError[key] + '\n';
            }
        }

        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;

        return Observable.throw(applicationError || modelStateErrors || 'Server error');
    }

}