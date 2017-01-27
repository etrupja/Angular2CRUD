export interface IDepartment {
    id?: number;
    name: string;
    description:string;
    employees?: number;
}

export class Department {
    id: number;
    name: string;
    description:string;
  
}


export interface IEmployee {
     id?: number;
     lastName: string;
     firstName: string;
     birthDate: Date;
     jobPosition: string;
     departmentId:number;
     department?:string;
     contracts?: number[];
}

export class Employee {
     id: number;
     lastName: string;
     firstName: string;
     birthDate: Date;
     jobPosition: string;
     department:string;
}

export interface IContract{
    id?:number;
    name:string;
    startDate:Date;
    endDate:Date;
    amount:number;
    employeeId:number;
    employee?:string
}


export class DropDown{
    public value:number;
    public label:string;
    constructor(value: number, label: string) {
        this.value = value;
        this.label = label;
    }
}







export interface Predicate<T> {
    (item: T): boolean
}