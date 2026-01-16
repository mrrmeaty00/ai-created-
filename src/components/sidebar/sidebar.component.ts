import { Component, ChangeDetectionStrategy, signal, input, output, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Drive, AiProvider, CloudProvider } from '../../types';
import { FileSystemService } from '../../services/file-system.service';
import { AiIntegrationService } from '../../services/ai-integration.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class SidebarComponent {
  fsService = inject(FileSystemService);
  aiService = inject(AiIntegrationService);

  currentPath = input.required<string[]>();
  selectionChange = output<string[]>();
  cloudLoginAttempt = output<CloudProvider>();
  aiLoginAttempt = output<AiProvider>();
  vaultClick = output<void>();

  selectedItem = computed(() => this.currentPath()[this.currentPath().length - 1]);
  isCloudView = computed(() => this.currentPath()[0] === '_cloud_');
  isVaultView = computed(() => this.currentPath()[0] === '_vault_');
  
  isVaultLocked = this.fsService.isVaultLocked;

  quickAccess = signal([
    { name: 'Home', icon: 'home', path: ['Home'] },
    { name: 'Recent', icon: 'clock', path: ['Recent'] },
    { name: 'Desktop', icon: 'desktop', path: ['Desktop'] },
    { name: 'Documents', icon: 'document', path: ['Documents'] },
    { name: 'Downloads', icon: 'download', path: ['Downloads'] },
    { name: 'Pictures', icon: 'picture', path: ['Pictures'] },
  ]);

  drives = signal<Drive[]>([
    { name: 'C: Drive', total: 500, used: 380, icon: 'disk' },
    { name: 'E: Drive', total: 1000, used: 886.2, icon: 'disk' },
  ]);

  // Data now comes from services
  cloudProviders = this.fsService.cloudProviders;
  aiProviders = this.aiService.aiProviders;
  localEngines = this.aiService.localEngines;
  activeAiProvider = this.aiService.activeProvider;

  getDriveUsagePercentage(drive: Drive): number {
    return (drive.used / drive.total) * 100;
  }

  selectPath(path: string[]) {
    this.selectionChange.emit(path);
  }

  onCloudProviderClick(provider: CloudProvider) {
    if (provider.loggedIn) {
      this.selectPath(['_cloud_', provider.name]);
    } else {
      this.cloudLoginAttempt.emit(provider);
    }
  }

  onAiProviderClick(provider: AiProvider) {
    if (provider.loggedIn) {
      this.aiService.setActiveProvider(provider);
    } else {
      this.aiLoginAttempt.emit(provider);
    }
  }
}
