import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { DemoResults } from '../../models';


@Component({
  selector: 'app-hrv',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #chartCanvas></canvas>`,
  styleUrl: './hrv.css'
})

export class Hrv implements AfterViewInit {
  @ViewChild('chartCanvas') chartRef!: ElementRef<HTMLCanvasElement>;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.http.get<DemoResults>('/assets/demo_result.json').subscribe(data => {
      
      const hr = data.heartrate.measurements;

      const labels = hr.map(row => row.time / 1000);

      const hrv = hr.map(row => row.hrv);

      const avgHRV = data.heartrate.trends.hrv.average;

      new Chart(this.chartRef.nativeElement, {
              type: 'line',
              data: {
                labels,
                datasets: [
                  {
                    label: 'HRV (ms)',
                    data: hrv,
                    borderWidth: 2,
                    borderColor: 'blue',
                  },
                  {
                    label: 'Average HRV',
                    data: Array(hrv.length).fill(avgHRV),
                    borderColor: 'purple',
                    fill: false,
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
                    text: 'running average sampled every 10 seconds',
                  },
                },
                scales: {
                  y: {
                    type: 'linear',
                    display: true,
                    title: { display: true, text: 'HRV (ms)' },
                  },
                  x: {
                    title: { display: true, text: 'Time (s)' },
                  },
                },
              },
            });
    })
}
}
