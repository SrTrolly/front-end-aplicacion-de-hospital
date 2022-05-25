import { Doctor } from '../models/doctor.model';
import { Hospital } from '../models/hospital.model';
import { Usuario } from './../models/usuario.model';



export interface Busqueda {
  ok: boolean;
  resultados: Usuario[];
}

export interface Resultado {
  rol: string;
  nombre: string;
  email: string;
  google: boolean;
  uid: string;
  img?: string;
}

export interface BusquedaCompleta {
  ok: boolean;
  msg: string;
  usuarios: Usuario[];
  doctores: Doctor[];
  hospitales: Hospital[];
}





