export interface IDepartment {
    id?: number;
    name: string;
    description:string;
    employees?: number;
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

export interface IContract{
    id?:number;
    name:string;
    startDate:Date;
    endDate:Date;
    amount:number;
    employeeId:number;
    employee?:string
}