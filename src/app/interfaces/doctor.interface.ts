
import { Doctor, _DoctorUser } from '../models/doctor.model';


// To parse this data:
//
//   import { Convert, CargarDoctores } from "./file";
import { Usuario } from './cargar-hospitales.interface';
//
//   const cargarDoctores = Convert.toCargarDoctores(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.


export interface CargarDoctores {
  ok: boolean;
  msg: string;
  doctores: Doctor[];
}

export interface CargarDoctorPorId {
  ok: boolean,
  msg: string,
  doctor: DoctorById
}

export interface EliminarDoctor {
  ok: boolean,
  msg: string
}

export interface Hospital {
  _id: string;
  nombre: string;
  img: string;
}



export interface CrearDoctor {
  ok: boolean;
  msg: string;
  doctorDB: DoctorDB;
}

interface DoctorDB {
  nombre: string;
  usuario: string;
  hospital: string;
  id: string;
}

interface DoctorById {
  nombre: string,
  _id?: string,
  img?: string,
  usuario?: _DoctorUser,
  hospital?: Hospital
}



