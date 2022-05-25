import { Subscription, delay } from 'rxjs';
import { Hospital } from './../../../models/hospital.model';
import { HospitalService } from './../../../services/hospital.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})

export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs!: Subscription;

  constructor(private hospitalService: HospitalService, private modalImagenService: ModalImagenService, private busquedaService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(delay(100)).subscribe(img => this.cargarHospitales());
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarHospitales();
    }

    this.busquedaService.buscar("hospitales", termino).subscribe(resp => {
      this.hospitales = resp as Hospital[];
    })
  }


  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe(hospitales => {
      this.cargando = false;
      this.hospitales = hospitales;
    })
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHispital(hospital.id!, hospital.nombre).subscribe(resp => {
      Swal.fire("Actualizado", hospital.nombre, "success");
    })
  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalService.borrarHospital(hospital.id!).subscribe(resp => {
      Swal.fire("Eliminado", hospital.nombre, "success")
      this.cargarHospitales();
    });
  }


  async abrirSweetAlert() {
    const valor = await Swal.fire<string>({
      title: "Crear hospital",
      text: "Ingrese el nombre dle nuevo hospital",
      input: "text",
      inputPlaceholder: "Nombre del hospital",
      showCancelButton: true
    });
    if (valor.value?.trim().length! > 0) {
      this.hospitalService.crearHospital(valor.value!).subscribe(resp => {
        this.hospitales.push(resp.hospitalDB);

      })
    }

  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal("hospitales", hospital.id!, hospital.img);

  }

}
