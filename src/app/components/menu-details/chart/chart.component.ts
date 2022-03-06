import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
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
        data: [
          // { x: '0', y: 250 },
          // { x: '1', y: 250 },
          // { x: '2', y: 250 },
          // { x: '3', y: 250 },
          // { x: '4', y: 250 },
          // { x: '5', y: 250 },
          // { x: '6', y: 250 },
          // { x: '7', y: 250 },
          // { x: '8', y: 250 },
          // { x: '9', y: 250 },
          // { x: '10', y: 250 },
          // { x: '11', y: 250 },
          // { x: '12', y: 250 },
          // { x: '13', y: 250 },
          // { x: '14', y: 250 },
          // { x: '15', y: 250 },
          // { x: '16', y: 250 },
          // { x: '17', y: 250 },
          // { x: '18', y: 250 },
          // { x: '19', y: 250 },
          // { x: '20', y: 255 },
          // { x: '21', y: 255 },
          // { x: '22', y: 250 },
          // { x: '23', y: 250 },
          // { x: '24', y: 250 },
          // { x: '25', y: 250 },
          // { x: '26', y: 250 },
          // { x: '27', y: 250 },
          // { x: '28', y: 250 },
          // { x: '29', y: 250 },
          // { x: '30', y: 250 },
          // { x: '31', y: 250 },
          // { x: '32', y: 260 },
          // { x: '33', y: 270 },
          // { x: '34', y: 270 },
          // { x: '35', y: 275 },
        ],
      },
    ],
  };

  ngOnInit(): void {}

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
