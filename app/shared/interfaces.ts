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
     id: number;
     lastName: string;
     firstName: string;
     age: number;
     birthdate: Date;
     jobPosition: string;
     departmentId:number;
     department:string;
     contracts: number[];
}

export interface IContract{
    id:number;
    name:string;
    startDate:Date;
    endDate:Date;
    amount:number;
    employeeId:number;
    employee:string
}







export interface Predicate<T> {
    (item: T): boolean
}