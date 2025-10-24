import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { DemoResults } from '../../models';


@Component({
  selector: 'app-pulsatility',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #chartCanvas></canvas>`,
  styleUrl: './pulsatility.css'
})
export class PulsatilityComponent implements AfterViewInit {
   @ViewChild('chartCanvas') chartRef!: ElementRef<HTMLCanvasElement>;

   constructor(private http: HttpClient) {}

   ngAfterViewInit() {
       this.http.get<DemoResults>('/assets/demo_result.json').subscribe(data => {
             
             const brain = data.brainPulsatility.measurements;
       
             const labels = brain.map(row => row.time / 1000);
       
             const brainPuls = brain.map(row => row.pulsatility);
             
             const avgPuls = data.brainPulsatility.trends.average;
       
             new Chart(this.chartRef.nativeElement, {
               type: 'line',
               data: {
                 labels,
                 datasets: [
                   {
                     label: 'Brain Pulsatility (null)',
                     data: brainPuls,
                     borderWidth: 2,
                     borderColor: 'orange',
                   },
                   {
                     label: 'Average Pulsatility',
                     data: Array(brainPuls.length).fill(avgPuls),
                     borderColor: 'yellow',
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
                     text: 'Brain pulsatility values',
                   },
                 },
                 scales: {
                   y: {
                     type: 'linear',
                     display: true,
                     title: { display: true, text: 'Pulsatility' },
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
