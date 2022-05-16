import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {


  private _ocultarModal: boolean = true;
  public tipo!: "usuarios" | "doctores" | "hospitales";
  public id!: string;
  public img!: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(tipo: "usuarios" | "doctores" | "hospitales", id: string, img: string = "no-img") {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    // this.img = img || "";
    //http://localhost:8080/api/upload/usuarios/43191e16-72c1-419f-82b9-d36ba47c60ac.jpg
    if (img?.includes("https")) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }
  }

  cerrarModal() {
    this._ocultarModal = true;
  }
  constructor() { }
}
