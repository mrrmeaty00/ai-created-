import { Component, ChangeDetectionStrategy, signal, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeminiService } from '../../services/gemini.service';
import { AiIntegrationService } from '../../services/ai-integration.service';
import { FormsModule } from '@angular/forms';
import { WeatherWidgetComponent } from '../weather-widget/weather-widget.component';

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

@Component({
  selector: 'app-ai-panel',
  templateUrl: './ai-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, WeatherWidgetComponent],
  providers: [GeminiService]
})
export class AiPanelComponent {
  geminiService = inject(GeminiService);
  aiService = inject(AiIntegrationService);

  prompt = signal('');
  messages = signal<Message[]>([]);
  isLoading = signal(false);
  
  activeProvider = this.aiService.activeProvider;
  selectedModel = signal<string>('');
  isDropdownOpen = signal(false);
  isSettingsOpen = signal(false);

  constructor() {
    effect(() => {
        const currentProvider = this.activeProvider();
        this.selectedModel.set(currentProvider?.models[0] || '');
        this.messages.set([]);
    });
  }

  toggleDropdown() {
    this.isDropdownOpen.update(v => !v);
  }
  
  toggleSettings() {
    this.isSettingsOpen.update(v => !v);
  }

  selectModel(model: string) {
    this.selectedModel.set(model);
    this.isDropdownOpen.set(false);
  }

  async sendMessage() {
    const userPrompt = this.prompt().trim();
    if (!userPrompt || this.isLoading()) return;

    this.messages.update(m => [...m, { sender: 'user', text: userPrompt }]);
    this.prompt.set('');
    this.isLoading.set(true);
    
    try {
        const response = await this.geminiService.generateContent(userPrompt);
        this.messages.update(m => [...m, { sender: 'ai', text: response }]);
    } catch (error) {
        console.error('Error generating content:', error);
        this.messages.update(m => [...m, { sender: 'ai', text: 'Sorry, I encountered an error.' }]);
    } finally {
        this.isLoading.set(false);
    }
  }
}
