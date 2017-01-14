import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { 
    IEmployee, 
    IDepartment, 
    IContract,
    Department,
    Employee
                } from '../interfaces';
import { ConfigService } from '../api_settings/config.service';

@Injectable()
export class DataService {

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
    updateDepartment(department: Department): Observable<void> {

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
createEmployee(employee: IEmployee): Observable<IEmployee> {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this._baseUrl + 'employee/', JSON.stringify(employee), {
        headers: headers
    })
        .map((res: Response) => {
            return res.json();
        })
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
createContract(contract: IContract): Observable<IContract> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this._baseUrl + 'contract/', JSON.stringify(contract), {
        headers: headers
    })
        .map((res: Response) => {
            
            return res.json();
        })
        .catch(this.handleError);
}

//updates a contract
    updateContract(contract: IContract): Observable<void> {
        alert(JSON.stringify("Contract: "+contract));
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