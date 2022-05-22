// To parse this data:
//
//   import { Convert, CargarHospitales } from "./file";
//
//   const cargarHospitales = Convert.toCargarHospitales(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface CargarHospitales {
  ok: boolean;
  msg: string;
  hospitales: Hospitales[];
}

export interface CrearHospital {
  ok: boolean,
  msg: string,
  hospitalDB: Hospitales
}

export interface EliminarHospital {
  ok: boolean,
  msg: string
}

export interface Hospitales {
  nombre: string;
  usuario: Usuario;
  id: string;

}

export interface Usuario {
  id: string;
  nombre: string;
  img: string;
}




