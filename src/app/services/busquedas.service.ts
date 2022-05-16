import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Busqueda } from '../interfaces/busquedas.interface';
import { Usuario } from '../models/usuario.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {


  constructor(private http: HttpClient) { }

  get token() {
    return localStorage.getItem("token") || "";
  }

  get headers() {
    return {
      headers: {
        "x-token": this.token
      }
    }
  }

  transformarUsuarios(resultados: Usuario[]): Usuario[] {
    return resultados.map(
      usuario => new Usuario(usuario.nombre, usuario.email, "", usuario.img, usuario.google, usuario.rol, usuario.uid)
    );
  }



  buscar(tipo: "usuarios" | "doctores" | "hospitales", termino: string) {

    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<Busqueda>(url, this.headers).pipe(
      map(resp => {
        switch (tipo) {
          case "usuarios":
            return this.transformarUsuarios(resp.resultados)
            break;

          default:
            return []
            break;
        }
      })

    );
  }

}
