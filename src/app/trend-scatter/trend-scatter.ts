import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { TrendResults } from '../../models';


@Component({
  selector: 'app-trend-scatter',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #chartCanvas></canvas>`,
  styleUrl: './trend-scatter.css'
})

export class TrendScatter implements AfterViewInit {
  @ViewChild('chartCanvas') chartRef!: ElementRef<HTMLCanvasElement>;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.http.get<TrendResults>('/assets/data/demo_result.json').subscribe(data => {

      const hrvAvg = data.HRTrend.hrv.average;
      const rateAvg = data.HRTrend.rate.average;
      const pulsAvg = data.PulsatilityTrend.average;
      const gIndexAvg = data.GIndexTrend.average;
      //const RateTrend = data.HRTrend.rate;
     const dataPoints = [
  { name: 'Heart Rate', value: rateAvg },
  { name: 'HRV', value: hrvAvg },
  { name: 'Pulsatility', value: pulsAvg },
  { name: 'G Index', value: gIndexAvg }
];

new Chart(this.chartRef.nativeElement, {
  type: 'scatter',
  data: {
    datasets: [{
      label: 'Trends',
      data: dataPoints.map(p => ({ x: p.value, y: p.value })),
      backgroundColor: 'rgba(225, 59, 95, 1)'
    }]
  },
  options: {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Keskiarvo'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Keskiarvo'
        }
      }
    }
  }
});
                                         
    });
  }
}
