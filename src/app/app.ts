import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeartRate } from './chart/chart';
import { Hrv } from './hrv/hrv';
import { PulsatilityComponent } from './pulsatility/pulsatility';
import { TrendScatter } from './trend-scatter/trend-scatter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeartRate, Hrv, PulsatilityComponent, TrendScatter],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('json-app');
}
