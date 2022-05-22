import { Hospital } from './hospital.model';
export interface _DoctorUser {
  _id: string;
  nombre: string;
  img?: string
}


export class Doctor {


  constructor(
    public nombre: string,
    public id?: string,
    public img?: string,
    public usuario?: _DoctorUser,
    public hospital?: Hospital
  ) { }
}
