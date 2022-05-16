import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {


  public usuario!: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = "";


  constructor(public modalImagenService: ModalImagenService, public fileUploadService: FileUploadService) { }

  ngOnInit(): void {

  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id).subscribe(resp => {
      console.log(resp)
      if (!resp.ok) {
        this.cerrarModal();
        return Swal.fire({
          title: "Error!",
          text: resp.error.msg,
          confirmButtonText: "Entiendo",

        })
      } else {
        this.cerrarModal();
        this.modalImagenService.nuevaImagen.emit(resp);
        return Swal.fire("Imagen Guardada", resp.nombreArchivo, "success");
      }
    })
  }

}
