import {
  Component,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  Chart
} from 'chart.js';

interface ChartDataModel {
  label: string;
  background: string;
  percentage: number
}

@Component({
  selector: 'registry-academics-chart',
  templateUrl: './academics.chart.html',
  styleUrls: ['./academics.chart.scss']
})
export class RegistryAcademicsChart {
  constructor () {}

  protected doughnutData: Object = {};
  @ViewChild('doughnutChart') private chart: ElementRef;

  protected chartData: Array<ChartDataModel> = [{
      label: 'a',
      background: this.getRandomColor(),
      percentage: 15
    },
    {
      label: 'b',
      background: this.getRandomColor(),
      percentage: 25
    },
    {
      label: 'c',
      background: this.getRandomColor(),
      percentage: 40
    },
    {
      label: 'd',
      background: this.getRandomColor(),
      percentage: 20
    }
  ];

  public ngOnInit (): void {
    this.doughnutData = new Chart(this.chart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.chartData.map(a => a.label),
        datasets: [{
          backgroundColor: this.chartData.map(a => a.background),
          data: this.chartData.map(a => a.percentage),
          datalabels: {
            anchor: 'end'
          }
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            backgroundColor: function (context): any {
              return context.dataset.backgroundColor;
            },
            borderColor: 'white',
            borderRadius: 25,
            borderWidth: 1,
            color: 'white',
            font: {
              weight: 'bold'
            },
            formatter: Math.round
          }
        },
        legend: {
          display: true
        },
      }
    });
  }

  private getRandomColor (): string {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
