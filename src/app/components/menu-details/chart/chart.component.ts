import { Component, Input, OnChanges } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnChanges {
  @Input() prices: any = [];

  constructor() {}

  chartOptions: ChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  chartData: any = {
    datasets: [
      {
        data: [],
      },
    ],
  };

  ngOnChanges(): void {
    this.chartData = {
      datasets: [
        {
          data: this.prices.map((price, index) => {
            return {
              x: price.createdAt,
              y: price.price,
            };
          }),
        },
      ],
    };
  }
}
