import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { DemoResults } from '../../models';


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
    this.http.get<DemoResults>('/assets/data/demo_result.json').subscribe(data => {

      //const RateTrend = data.HRTrend.rate;
      const hrvAvg = data.heartrate.trends.hrv.average;
      const rateAvg = data.heartrate.trends.rate.average;
      const pulsAvg = data.brainPulsatility.trends.average;
      const gIndexAvg = data.gIndex.trends.average;


      new Chart(this.chartRef.nativeElement, {
                     type: 'scatter',
                     data: {
                      datasets: [{
                      label: 'Trends',
                      data: [{
                        label: 'Heart Rate Trend',
                        x: rateAvg,
                        y: rateAvg,
                        backgroundColor: 'rgba(42, 216, 68, 1)',
                      }, {
                        label: 'HRV Trend',
                        x: hrvAvg,
                        y: hrvAvg,
                        backgroundColor: 'rgba(225, 134, 59, 1)'
                      }, {
                        label: 'Brain Pulsatility Trend',
                        x: pulsAvg,
                        y: pulsAvg,
                        backgroundColor: 'rgba(225, 59, 84, 1)'
                      }, {
                        label: 'G Index Trend',
                        x: gIndexAvg,
                        y: gIndexAvg,
                        backgroundColor: 'rgba(59, 181, 225, 1)',
                        
                      }],
                      //backgroundColor: 'rgba(225, 59, 95, 1)'
                      }],
                    },
                    options: {
                      scales: {
                        x: {
                        type: 'linear',
                        position: 'bottom'
                        }
                      }
                    }
        });                                          
    });
  }
}
