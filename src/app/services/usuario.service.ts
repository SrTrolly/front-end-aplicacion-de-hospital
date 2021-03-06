import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, delay, tap } from "rxjs/operators"
import { map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

import { CargarUsuario, EliminarUsuario, ActualizarUsuario } from '../interfaces/cargar-usuarios.interface';


const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario!: Usuario;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleinit();
  }

  get token(): string {
    return localStorage.getItem("token") || "";
  }

  get rol(): "ADMIN_ROLE" | "USER_ROLE" {
    return this.usuario.rol
  }

  get uid(): string {
    return this.usuario.uid || "";
  }

  get headers() {
    return {
      headers: {
        "x-token": this.token
      }
    }
  }

  guardarLocalStorage(token: string, menu: any) {
    localStorage.setItem("token", token);
    // localStorage.setItem("menu", JSON.stringify(menu));
    localStorage.setItem("menu", JSON.stringify(menu))
  }

  googleinit() {

    return new Promise<void>(resolve => {


      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '606628177046-16ggoau1376u7nj6ncvm7f3u53v5178t.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    })

  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("menu");
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl("/login");
      })
    });

  }

  validarToken(): Observable<boolean> {


    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        "x-token": this.token
      }
    }).pipe(
      map((resp: any) => {
        const {
          email,
          google,
          img = "",
          nombre,
          rol,
          uid
        } = resp.usuario

        this.usuario = new Usuario(nombre, email, rol, img, google, rol, uid);
        this.guardarLocalStorage(resp.token, resp.menu);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  crearUsuario(formData: RegisterForm) {

    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    );
  }

  actualizarPerfil(data: { email: string, nombre: string, rol: string }) {

    data = {
      nombre: data.nombre,
      email: data.email,
      rol: this.usuario.rol || ""

    }


    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu)
      })
    );
  }

  loginGoogle(token: any) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    );
  }

  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers).pipe(
      map(resp => {

        const usuarios = resp.usuarios.map(user => new Usuario(user.nombre, user.email, user.rol, user.password, user.img, user.google, user.uid));
        return {
          total: resp.total,
          usuarios: usuarios
        }
      })
    )
  }

  eliminarUsuario(usuario: Usuario) {
    // localhost:8080/api/usuarios/624a288daf3a7a8b1f423616

    const url = `${base_url}/usuarios/${usuario.uid}`;

    return this.http.delete<EliminarUsuario>(url, this.headers);


  }



  guardarUsuario(usuario: Usuario) {


    const url = `${base_url}/usuarios/${usuario.uid}`
    return this.http.put<ActualizarUsuario>(url, usuario, this.headers);
  }
}
