import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = "";

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private fileUploadService: FileUploadService) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
  }


  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe(resp => {
      const { nombre, email } = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;

      Swal.fire("Guardado", "Cambios fueron guardados", "success");
    }, (err) => {
      Swal.fire("Error", err.error.msg, "error")
    })

  }

  cambiarImagen(event: any) {
    var file: File;

    file = event.target.files[0]
    console.log(file);
    this.imagenSubir = file;
    if (!file) {
      return this.imgTemp = null;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return reader.onloadend = () => {
        this.imgTemp = reader.result;
      }

    }

  }

  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenSubir, "usuarios", this.usuario.uid || "").subscribe(resp => {
      console.log(resp)
      if (!resp.ok) {
        return Swal.fire({
          title: "Error!",
          text: resp.error.msg,
          confirmButtonText: "Entiendo"
        })
      } else {
        this.usuario.img = resp.nombreArchivo;
        return Swal.fire("Imagen Guardada", resp.nombreArchivo, "success");
      }
    })
  }

}
