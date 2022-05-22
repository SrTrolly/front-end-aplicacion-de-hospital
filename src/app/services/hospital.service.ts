import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CargarHospitales, CrearHospital, EliminarHospital } from '../interfaces/cargar-hospitales.interface';
import { map } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem("token") || "";
  }

  get headers(): object {
    return {
      headers: {
        "x-token": this.token
      }
    }
  }

  cargarHospitales() {
    const url = `${base_url}/hospital`;
    return this.http.get<CargarHospitales>(url, this.headers).pipe(
      map(resp => resp.hospitales)
    )
  }

  crearHospital(nombre: string) {
    const url = `${base_url}/hospital`;
    return this.http.post<CrearHospital>(url, { nombre }, this.headers);
  }

  actualizarHispital(id: string, nombre: string) {
    const url = `${base_url}/hospital/${id}`;
    return this.http.put<CargarHospitales>(url, { nombre }, this.headers);
  }

  borrarHospital(id: string) {
    const url = `${base_url}/hospital/${id}`;
    return this.http.delete<EliminarHospital>(url, this.headers);
  }

}
