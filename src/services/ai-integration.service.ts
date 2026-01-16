import { Injectable, signal } from '@angular/core';
import { AiProvider } from '../types';

@Injectable({
  providedIn: 'root'
})
export class AiIntegrationService {
  aiProviders = signal<AiProvider[]>([
      { name: 'Gemini', models: ['gemini-2.5-flash', 'gemini-1.5-pro'], icon: 'gemini', loggedIn: false},
      { name: 'OpenAI', models: ['GPT-4o', 'GPT-4 Turbo'], icon: 'openai', loggedIn: false},
      { name: 'Anthropic', models: ['Claude 3.5 Sonnet', 'Claude 3 Opus'], icon: 'anthropic', loggedIn: false}
  ]);
  
  localEngines = signal([
      { name: 'Ollama', icon: 'cpu-chip'},
      { name: 'Jan', icon: 'cpu-chip'},
      { name: 'LM Studio', icon: 'cpu-chip'}
  ]);

  activeProvider = signal<AiProvider | null>(null);

  constructor() {
    this.setActiveProvider(this.aiProviders().find(p => p.loggedIn) || null);
  }

  setActiveProvider(provider: AiProvider | null) {
    if (provider && !provider.loggedIn) {
      console.warn('Attempted to set an AI provider that is not logged in.');
      return;
    }
    this.activeProvider.set(provider);
  }

  loginToAiProvider(providerName: string): void {
    let providerToActivate: AiProvider | null = null;
    this.aiProviders.update(providers => 
        providers.map(p => {
          if (p.name === providerName) {
            const loggedInProvider = { ...p, loggedIn: true };
            providerToActivate = loggedInProvider;
            return loggedInProvider;
          }
          return p;
        })
    );
    if(providerToActivate) {
        this.setActiveProvider(providerToActivate);
    }
  }
}
