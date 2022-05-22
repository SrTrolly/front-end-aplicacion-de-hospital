import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CargarDoctores, CrearDoctor, EliminarDoctor, CargarDoctorPorId } from '../interfaces/doctor.interface';
import { map } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem("token") || "";
  }

  get headers(): Object {
    return {
      headers: {
        "x-token": this.token
      }
    }
  }

  cargarDoctores() {
    const url = `${base_url}/doctor`;
    return this.http.get<CargarDoctores>(url, this.headers).pipe(
      map(resp => resp.doctores)
    );
  }

  obtenerMedicoPorId(id: string) {
    const url = `${base_url}/doctor/${id}`;
    return this.http.get<CargarDoctorPorId>(url, this.headers).pipe(
      map(resp => resp.doctor)
    );
  }

  crearDoctor(nombreId: string, hospitalId: string) {
    const url = `${base_url}/doctor`;
    const data = { nombre: nombreId, hospital: hospitalId }
    return this.http.post<CrearDoctor>(url, data, this.headers).pipe(
      map(resp => resp.doctorDB)
    );
  }

  actualizarDoctor(id: string, nombreId: string, hospitalId: string) {
    const url = `${base_url}/doctor/${id}`;
    const data = {
      nombre: nombreId,
      hospital: hospitalId
    }
    return this.http.put<CargarDoctores>(url, data, this.headers).pipe(
      map(resp => resp.doctores)
    )
  }

  borrarDoctor(id: string) {
    const url = `${base_url}/doctor/${id}`
    return this.http.delete<EliminarDoctor>(url, this.headers);

  }


}

