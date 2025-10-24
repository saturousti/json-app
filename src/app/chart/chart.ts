import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { DemoResults } from '../../models';


@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #chartCanvas></canvas>`,
})
export class HeartRate implements AfterViewInit {
  @ViewChild('chartCanvas') chartRef!: ElementRef<HTMLCanvasElement>;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.http.get<DemoResults>('/assets/demo_result.json').subscribe(data => {
      
      const hr = data.heartrate.measurements;

      const labels = hr.map(row => row.time / 1000);

      const rates = hr.map(row => row.rate);
      
      const avgRate = data.heartrate.trends.rate.average;

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
            },
            {
              label: 'Average Heart Rate',
              data: Array(rates.length).fill(avgRate),
              borderColor: 'green',
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
              title: { display: true, text: 'Heart Rate (bpm)' },
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
