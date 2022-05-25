import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from '../../services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios!: Usuario[];
  public doctores!: Doctor[];
  public hospitales!: Hospital[];

  constructor(private activatedRoute: ActivatedRoute, private busquedasService: BusquedasService) { }

  ngOnInit(): void {

    // this.activatedRoute.params.subscribe(params => {
    // console.log(params['termino'])
    // })

    this.activatedRoute.params.subscribe(({ termino }) => {
      this.busquedaGlobal(termino);
    })


  }


  busquedaGlobal(termino: string) {
    this.busquedasService.busquedaGlobal(termino).subscribe(resp => {
      this.usuarios! = resp.usuarios;
      this.hospitales! = resp.hospitales;
      this.doctores! = resp.doctores;
    })
  }

}
