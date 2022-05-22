
import { Usuario } from '../interfaces/cargar-hospitales.interface';



interface _HospitalUser {
  _id: string,
  nombre: string,
  img: string
}


export class Hospital {

  constructor(
    public nombre: string,
    public id?: string,
    public img?: string,
    public usuario?: Usuario,
    public doctor?: _HospitalUser
  ) { }

}
