import { Component, OnInit } from '@angular/core';





@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {


  public labels1: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public data1: number[] = [
    350, 450, 500
  ];

  public labels2: string[] = ['Trolly ventas', 'Trolly compras', 'Orden de trolly'];
  public data2: number[] = [
    250, 300, 750
  ];



  constructor() { }

  ngOnInit(): void {
  }

}
