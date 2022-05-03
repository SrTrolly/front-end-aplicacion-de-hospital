import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { FileUpload } from '../interfaces/upload-file.interface';
import { Observable, map, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  constructor(private http: HttpClient) { }


  get token(): string {
    return localStorage.getItem("token") || "";
  }

  // async actualizarFoto(
  //   archivo: File,
  //   tipo: "usuarios" | "doctores" | "hospitales",
  //   id: string
  // ) {
  //   try {

  //     const url = `${base_url}/upload/${tipo}/${id}`
  //     const formData = new FormData();
  //     formData.append("imagen", archivo);

  //     const resp = await fetch(url, {
  //       method: "PUT",
  //       headers: {
  //         "x-token": localStorage.getItem("token") || ""
  //       },
  //       body: formData
  //     });

  //     console.log(resp);


  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }

  actualizarFoto(archivo: File, tipo: "usuarios" | "doctores" | "hospitales", id: string) {
    const url = `${base_url}/upload/${tipo}/${id}`;
    const formData = new FormData();
    formData.append("imagen", archivo);
    return this.http.put<FileUpload>(url, formData, {
      headers: {
        "x-token": this.token
      }
    }).pipe(
      map((resp: FileUpload) => {
        if (resp.ok) {
          return resp
        } else {
          return resp.msg;
        }
      }), catchError((error) => of(error))
    )
  }



}
