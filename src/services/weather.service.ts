import { Injectable } from '@angular/core';
import { of, delay } from 'rxjs';

export interface WeatherData {
    location: string;
    temperature: number;
    condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'ClearNight';
    icon: 'sun' | 'cloud' | 'rain' | 'moon';
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  // Mock weather API call
  getWeather(zipCode?: string | null) {
    console.log(`Fetching weather for zip: ${zipCode || 'auto-detect'}`);

    let mockData: WeatherData;

    if (zipCode && zipCode.startsWith('9')) { // California-like
        mockData = { location: 'Palo Alto, CA', temperature: 72, condition: 'Sunny', icon: 'sun' };
    } else if (zipCode && zipCode.startsWith('1')) { // New York-like
        mockData = { location: 'New York, NY', temperature: 58, condition: 'Cloudy', icon: 'cloud' };
    } else { // Default / Auto-detected
        mockData = { location: 'Chicago, IL', temperature: 65, condition: 'ClearNight', icon: 'moon' };
    }
    
    return of(mockData).pipe(delay(500)); // Simulate network latency
  }
}
