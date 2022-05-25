import { Component, OnInit, OnDestroy } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from '../../../services/doctor.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styles: [
  ]
})
export class DoctoresComponent implements OnInit, OnDestroy {

  public doctores: Doctor[] = [];
  public cargando: boolean = true;
  private imgSubs!: Subscription;

  constructor(private doctorService: DoctorService, private modaImagenService: ModalImagenService, private busquedasService: BusquedasService) { }


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarDoctores();
    this.imgSubs = this.modaImagenService.nuevaImagen.pipe(delay(100)).subscribe(img => this.cargarDoctores());
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarDoctores();
    }

    this.busquedasService.buscar("doctores", termino).subscribe(resp => {
      this.doctores = resp as Doctor[]
    })
  }

  cargarDoctores() {
    this.cargando = true;
    this.doctorService.cargarDoctores().subscribe(resp => {
      this.cargando = false;
      this.doctores = resp

    })
  }

  guardarCambios(doctor: Doctor) {
    this.doctorService.actualizarDoctor(doctor.id!, doctor.nombre, doctor.hospital?.id!).subscribe(resp => {
      Swal.fire("Actualizado", `${doctor.nombre} a ${doctor.hospital?.nombre}`, "success")
      this.cargarDoctores();
    })
  }

  abrirModal(doctor: Doctor) {
    this.modaImagenService.abrirModal("doctores", doctor.id!, doctor.img);
  }

  borrarDoctor(doctor: Doctor) {
    Swal.fire({
      title: "¿Borrar doctor?",
      text: `Esta a punto de borrar a ${doctor.nombre}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, borrarlo"
    }).then((result) => {
      if (result.value) {
        this.doctorService.borrarDoctor(doctor.id!).subscribe(resp => {
          this.cargarDoctores();
          Swal.fire(
            "Doctor eliminado",
            `${doctor.nombre} fue eliminado`,
            "success"
          )
        })
      }
    })
  }

}
