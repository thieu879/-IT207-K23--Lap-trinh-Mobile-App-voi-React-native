export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export interface Position {
  id: number;
  positionName: string;
}

export interface Employee {
  id: number;
  employeeCode: string;
  employeeName: string;
  phoneNumber: string;
  gender: Gender;
  dateBirth: string; // YYYY-MM-DD
  createdAt: string; // ISO Date String
  positionId: number;
  positionName: string;
}

