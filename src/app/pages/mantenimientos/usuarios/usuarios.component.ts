import { Usuario } from './../../../models/usuario.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { CargarUsuario } from '../../../interfaces/cargar-usuarios.interface';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs!: Subscription;

  constructor(private usuarioService: UsuarioService, private busquedasService: BusquedasService, private modalImagenService: ModalImagenService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuario();
    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(delay(100)).subscribe(resp => this.cargarUsuario());
  }

  cargarUsuario() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe(resp => {
      this.totalUsuarios = resp.total;
      this.usuarios = resp.usuarios;
      this.usuariosTemp = resp.usuarios;
      this.cargando = false;
    })
  }


  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuario();
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp
    } else {
      return this.busquedasService.buscar("usuarios", termino).subscribe(resp => {
        // console.log(resp);
        this.usuarios = resp
      })
    }


  }

  eliminarUsuario(usuario: Usuario) {

    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire("Error", "No puede borrarse a si mismo", "error");
    }
    return Swal.fire({
      title: 'Borrar usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.eliminarUsuario(usuario).subscribe(
          resp => {
            Swal.fire(
              'Eliminado',
              `El usuario ${usuario.nombre} a sido eliminado correctamente`,
              'success',
            );

            this.cargarUsuario();
          }
        )
      }
    })

  }

  cambiarRol(usuario: Usuario) {
    this.usuarioService.guardarUsuario(usuario).subscribe(resp => {
      console.log(resp);
    })
  }

  abrirModal(usuario: Usuario) {
    console.log(usuario);
    this.modalImagenService.abrirModal("usuarios", usuario.uid!, usuario.img);
  }
}


