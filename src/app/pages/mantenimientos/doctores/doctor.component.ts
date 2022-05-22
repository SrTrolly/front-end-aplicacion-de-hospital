import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from 'src/app/models/doctor.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {

  public doctorForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado!: Hospital | undefined;
  public doctorSeleccionado!: Doctor;

  constructor(private fb: FormBuilder, private hospitalService: HospitalService, private doctorService: DoctorService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarDoctor(id);
    })

    // this.doctorService.obtenerMedicoPorId()

    this.doctorForm = this.fb.group({
      nombre: ["", Validators.required],
      hospital: ["", Validators.required]
    });
    this.cargarHospitales()
    this.doctorForm.get("hospital")?.valueChanges.subscribe(hospitalId => {
      this.hospitalSeleccionado = this.hospitales.find(h => h.id === hospitalId);

    })
  }


  cargarDoctor(id: string) {

    if (id === "nuevo") {
      return;
    }
    this.doctorService.obtenerMedicoPorId(id).pipe(delay(100)).subscribe(doctor => {

      if (!doctor) {
        return this.router.navigateByUrl(`/dashboard/doctor`);
      }
      this.doctorSeleccionado = doctor
      return this.doctorForm.setValue({
        nombre: doctor.nombre,
        hospital: doctor.hospital?._id
      })
    });
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales().subscribe(resp => {
      this.hospitales = resp;
    })
  }

  guardarDoctor() {
    if (this.doctorSeleccionado) {
      //Actualizar

      const id = this.doctorSeleccionado.id;
      const { nombre, hospital } = this.doctorForm.value;

      this.doctorService.actualizarDoctor(id!, nombre, hospital!).subscribe(resp => {
        Swal.fire("Actualizado", `${nombre} creado correctamente`, "success");
        console.log(resp);

      })
    } else {
      const { nombre, hospital } = this.doctorForm.value;
      this.doctorService.crearDoctor(nombre, hospital).subscribe(resp => {
        Swal.fire("Creado", `${nombre} creado correctamente`, "success");
        this.router.navigateByUrl(`/dashboard/doctor/${resp.id}`);
      })

    }

  }

}
