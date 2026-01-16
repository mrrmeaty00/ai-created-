import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  zipCode = signal<string>('');

  setZipCode(code: string) {
    this.zipCode.set(code);
    // In a real app, you'd save this to localStorage or a backend
    console.log(`Zip code set to: ${code}`);
  }
}
