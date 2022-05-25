import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Busqueda, BusquedaCompleta } from '../interfaces/busquedas.interface';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Doctor } from '../models/doctor.model';


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

  private transformarUsuarios(resultados: Usuario[]): Usuario[] {
    return resultados.map(
      usuario => new Usuario(usuario.nombre, usuario.email, usuario.rol, usuario.password, usuario.img, usuario.google, usuario.uid)
    );
  }

  private transformarHospitales(resultados: Hospital[]): Hospital[] {
    return resultados;
  }

  private transformarDoctores(resultados: Doctor[]): Doctor[] {
    return resultados;
  }


  busquedaGlobal(termino: string) {
    const url = `${base_url}/todo/${termino}`;
    return this.http.get<BusquedaCompleta>(url, this.headers);
  }



  buscar(tipo: "usuarios" | "doctores" | "hospitales", termino: string) {

    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<Busqueda>(url, this.headers).pipe(
      map(resp => {
        switch (tipo) {
          case "usuarios":
            return this.transformarUsuarios(resp.resultados)
            break;

          case "hospitales":
            return this.transformarHospitales(resp.resultados)


          case "doctores":
            return this.transformarDoctores(resp.resultados);
          default:
            return []
            break;
        }
      })

    );
  }

}
