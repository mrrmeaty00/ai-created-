import { Component, ChangeDetectionStrategy, input, signal, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService, WeatherData } from '../../services/weather.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
})
export class WeatherWidgetComponent {
  weatherService = inject(WeatherService);
  settingsService = inject(SettingsService);

  showSettings = input(false);

  weatherData = signal<WeatherData | null>(null);
  isLoading = signal(true);
  
  zipCodeInput = signal('');

  constructor() {
    this.zipCodeInput.set(this.settingsService.zipCode());

    effect(() => {
        const zip = this.settingsService.zipCode();
        this.fetchWeather(zip);
    });
  }

  fetchWeather(zip: string) {
    this.isLoading.set(true);
    this.weatherService.getWeather(zip).subscribe(data => {
        this.weatherData.set(data);
        this.isLoading.set(false);
    });
  }

  saveSettings() {
    this.settingsService.setZipCode(this.zipCodeInput());
  }
}
