import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent implements OnChanges {

  @Input() title: string = "Sin titulo";
  @Input("labels") label: string[] = ["aloja"];
  @Input("datos") data: number[] = [350, 450, 100];


  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.label,
    datasets: [
      { data: this.data }
    ]
  }


  public doughnutChartType: ChartType = 'doughnut';




  constructor() { }

  ngOnChanges(): void {
    this.doughnutChartData = {
      labels: this.label,
      datasets: [
        { data: this.data }
      ]
    }

  }



}
