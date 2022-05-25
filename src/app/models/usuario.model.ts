import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

export class Usuario {


  constructor(
    public nombre: string,
    public email: string,
    public rol: "ADMIN_ROLE" | "USER_ROLE",
    public password?: string,
    public img?: string,
    public google?: boolean,
    public uid?: string

  ) { }

  get imagenUrl() {
    // /upload/usuario/no-image
    if (!this.img) {
      return `${base_url}/upload/usuarios/no-image`
    }

    if (this.img?.includes("https")) {
      return this.img
    }

    if (this.img) {
      return `${base_url}/upload/usuarios/${this.img}`
    } else {
      return `${base_url}/upload/usuarios/no-image`
    }
  }

}

