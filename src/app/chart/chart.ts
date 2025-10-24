import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #chartCanvas></canvas>`,
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartRef!: ElementRef<HTMLCanvasElement>;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.http.get<any>('/assets/demo_result.json').subscribe(data => {
      
      const hr = data.heartrate.measurements;

      const labels = hr.map((row: any) => row.time / 1000);

      const rates = hr.map((row: any) => row.rate);
      const hrv = hr.map((row: any) => row.hrv);

      new Chart(this.chartRef.nativeElement, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Heart Rate (bpm)',
              data: rates,
              borderWidth: 2,
              borderColor: 'red',
              yAxisID: 'y1',
            },
            {
              label: 'HRV (ms)',
              data: hrv,
              borderWidth: 2,
              borderColor: 'blue',
              yAxisID: 'y2',
            },
          ],
        },
        options: {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            title: {
              display: true,
              text: 'Heart Rate and HRV over Time',
            },
          },
          scales: {
            y1: {
              type: 'linear',
              display: true,
              position: 'left',
              title: { display: true, text: 'Heart Rate (bpm)' },
            },
            y2: {
              type: 'linear',
              display: true,
              position: 'right',
              title: { display: true, text: 'HRV (ms)' },
              grid: { drawOnChartArea: false },
            },
            x: {
              title: { display: true, text: 'Time (s)' },
            },
          },
        },
      });
    });
  }
}