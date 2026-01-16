import { Component, ChangeDetectionStrategy, signal, inject, HostListener } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FileViewComponent } from './components/file-view/file-view.component';
import { AiPanelComponent } from './components/ai-panel/ai-panel.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { VaultModalComponent } from './components/vault-modal/vault-modal.component';
import { FileSystemService } from './services/file-system.service';
import { AiIntegrationService } from './services/ai-integration.service';
import { FileItem, CloudProvider, AiProvider } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SidebarComponent, FileViewComponent, AiPanelComponent, ContextMenuComponent, LoginModalComponent, VaultModalComponent],
})
export class AppComponent {
  fsService = inject(FileSystemService);
  aiService = inject(AiIntegrationService);

  currentPath = signal(['Documents']);
  pathHistory = signal<string[][]>([['Documents']]);
  historyIndex = signal(0);
  
  contextMenu = signal({
    visible: false,
    x: 0,
    y: 0,
    file: null as FileItem | null,
  });

  loginModalState = signal<{visible: boolean, provider: CloudProvider | AiProvider | null, type: 'cloud' | 'ai' | null}>({
    visible: false,
    provider: null,
    type: null,
  });

  vaultModalVisible = signal(false);

  get currentSelection(): string {
    const path = this.currentPath();
    return path[path.length - 1] || 'File Explorer';
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.contextMenu.update(cm => ({ ...cm, visible: false }));
  }

  navigateTo(path: string[]) {
    if (JSON.stringify(path) === JSON.stringify(this.currentPath())) return;

    this.currentPath.set(path);
    const newHistory = this.pathHistory().slice(0, this.historyIndex() + 1);
    newHistory.push(path);
    this.pathHistory.set(newHistory);
    this.historyIndex.set(newHistory.length - 1);
  }

  navigateBack() {
    if (this.historyIndex() > 0) {
      this.historyIndex.update(i => i - 1);
      this.currentPath.set(this.pathHistory()[this.historyIndex()]);
    }
  }
  
  navigateForward() {
    if (this.historyIndex() < this.pathHistory().length - 1) {
      this.historyIndex.update(i => i + 1);
      this.currentPath.set(this.pathHistory()[this.historyIndex()]);
    }
  }

  navigateUp() {
    const path = this.currentPath();
    if (path.length > 1) {
      let newPath: string[];
      if ((path[0] === '_cloud_' || path[0] === '_vault_') && path.length === 2) {
        newPath = path.slice(0, 1);
      } else {
        newPath = path.slice(0, -1);
      }
      this.navigateTo(newPath);
    }
  }

  onFolderOpened(folderName: string) {
    const newPath = [...this.currentPath(), folderName];
    this.navigateTo(newPath);
  }

  onContextMenu(event: { mouseEvent: MouseEvent, file: FileItem | null }) {
    event.mouseEvent.preventDefault();
    event.mouseEvent.stopPropagation();
    this.contextMenu.set({
      visible: true,
      x: event.mouseEvent.clientX,
      y: event.mouseEvent.clientY,
      file: event.file,
    });
  }

  onContextMenuAction(action: string) {
    const file = this.contextMenu().file;
    const path = this.currentPath();
    this.contextMenu.update(cm => ({ ...cm, visible: false }));

    switch(action) {
      case 'new-folder':
        this.fsService.createFolder(path);
        break;
      case 'delete':
        if (file) {
          this.fsService.deleteItem(path, file.name);
        }
        break;
    }
  }

  onCloudLoginAttempt(provider: CloudProvider) {
    this.loginModalState.set({ visible: true, provider, type: 'cloud' });
  }

  onAiLoginAttempt(provider: AiProvider) {
    this.loginModalState.set({ visible: true, provider, type: 'ai' });
  }

  onLoginSuccess(providerName: string) {
    const { type } = this.loginModalState();
    if (type === 'cloud') {
      this.fsService.loginToCloudProvider(providerName);
      this.navigateTo(['_cloud_', providerName]);
    } else if (type === 'ai') {
      this.aiService.loginToAiProvider(providerName);
    }
    this.loginModalState.set({ visible: false, provider: null, type: null });
  }

  onLoginCancel() {
    this.loginModalState.set({ visible: false, provider: null, type: null });
  }

  onVaultClick() {
    if (this.fsService.isVaultLocked()) {
      this.vaultModalVisible.set(true);
    } else {
      this.navigateTo(['_vault_', 'Vault']);
    }
  }

  onVaultUnlocked() {
    this.vaultModalVisible.set(false);
    this.navigateTo(['_vault_', 'Vault']);
  }
}
