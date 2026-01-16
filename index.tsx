import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './src/app.component';
import { FileSystemService } from './src/services/file-system.service';
import { AiIntegrationService } from './src/services/ai-integration.service';
import { WeatherService } from './src/services/weather.service';
import { SettingsService } from './src/services/settings.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(),
    FileSystemService,
    AiIntegrationService,
    WeatherService,
    SettingsService,
  ],
}).catch(err => console.error(err));

// AI Studio always uses an `index.tsx` file for all project types.