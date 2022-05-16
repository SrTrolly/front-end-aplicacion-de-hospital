import { Usuario } from '../models/usuario.model';
export interface CargarUsuario {
  total: number,
  usuarios: Usuario[];
}

export interface EliminarUsuario {
  ok: boolean,
  msg: string,
  id: string
}

export interface ActualizarUsuario {
  ok: boolean,
  usuario: Usuario
}

