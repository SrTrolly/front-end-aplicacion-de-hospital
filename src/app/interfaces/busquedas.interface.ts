import { Usuario } from './../models/usuario.model';
import { Hospital } from '../models/hospital.model';


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



