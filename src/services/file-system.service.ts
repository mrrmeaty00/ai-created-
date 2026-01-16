import { Injectable, signal } from '@angular/core';
import { FileItem, CloudProvider } from '../types';
import { MOCK_FILE_SYSTEM, MOCK_CLOUD_FILES, MOCK_VAULT_FILES } from '../mock-data';

@Injectable()
export class FileSystemService {
  private fileSystem = signal<FileItem[]>(MOCK_FILE_SYSTEM);
  private vaultFiles = signal<FileItem[]>(MOCK_VAULT_FILES);

  // Vault state
  isVaultLocked = signal(true);
  hasVaultPassword = signal(false);
  
  cloudProviders = signal<CloudProvider[]>([
    { name: 'Google Drive', icon: 'google-drive', loggedIn: false },
    { name: 'Terabox', icon: 'cloud', loggedIn: false },
    { name: 'Mega', icon: 'cloud', loggedIn: false },
    { name: 'OneDrive', icon: 'cloud', loggedIn: false }
  ]);

  private findNode(path: string[]): FileItem | undefined {
    // Handle cloud paths
    if (path.length > 0 && path[0] === '_cloud_') {
        const providerName = path[1];
        const provider = this.cloudProviders().find(p => p.name === providerName);
        if (!provider?.loggedIn) return undefined;

        const cloudRoot: FileItem = {
            name: providerName,
            type: 'FOLDER',
            icon: 'folder',
            dateModified: '',
            size: '',
            children: MOCK_CLOUD_FILES[providerName] || []
        };

        if (path.length === 2) return cloudRoot;

        let currentNode: FileItem | undefined = cloudRoot;
        for (const part of path.slice(2)) {
             if (currentNode && currentNode.type === 'FOLDER' && currentNode.children) {
                currentNode = currentNode.children.find(child => child.name === part);
            } else {
                return undefined;
            }
        }
        return currentNode;
    }
    
    // Handle vault path
    if (path.length > 0 && path[0] === '_vault_') {
        if (this.isVaultLocked()) return undefined;

        const vaultRoot: FileItem = {
            name: 'Vault',
            type: 'FOLDER',
            icon: 'folder',
            dateModified: '',
            size: '',
            children: this.vaultFiles()
        };
        if (path.length === 2) return vaultRoot;

        // Note: Deep navigation in vault is not implemented in this mock
        return undefined;
    }

    // Handle local file system paths
    let currentNode: FileItem | undefined = { 
      name: 'root', 
      type: 'FOLDER', 
      dateModified: '', 
      size: '', 
      icon: '', 
      children: this.fileSystem() 
    };

    for (const part of path) {
      if (currentNode && currentNode.type === 'FOLDER' && currentNode.children) {
        currentNode = currentNode.children.find(child => child.name === part);
      } else {
        return undefined;
      }
    }
    return currentNode;
  }

  getContents(path: string[]): FileItem[] {
    if (path.length === 1 && (path[0] === '_cloud_' || path[0] === '_vault_')) return [];
    const node = this.findNode(path);
    return node?.children ?? [];
  }
  
  getItemsCount(path: string[]): number {
      return this.getContents(path).length;
  }

  createFolder(path: string[]): void {
    const parentNode = this.findNode(path);

    if (parentNode && parentNode.type === 'FOLDER') {
      const newFolderName = 'New folder';
      let finalName = newFolderName;
      let counter = 1;
      while (parentNode.children?.some(c => c.name === finalName)) {
        finalName = `${newFolderName} (${counter++})`;
      }

      const newFolder: FileItem = {
        name: finalName,
        type: 'FOLDER',
        dateModified: new Date().toLocaleTimeString(),
        size: '--',
        icon: 'folder',
        children: []
      };
      
      parentNode.children = [...(parentNode.children ?? []), newFolder];
      this.fileSystem.update(fs => [...fs]);
    }
  }

  deleteItem(path: string[], itemName: string): void {
    const parentNode = this.findNode(path);
    if (parentNode && parentNode.children) {
      parentNode.children = parentNode.children.filter(child => child.name !== itemName);
      this.fileSystem.update(fs => [...fs]);
    }
  }
  
  loginToCloudProvider(providerName: string): void {
    this.cloudProviders.update(providers => 
        providers.map(p => p.name === providerName ? { ...p, loggedIn: true } : p)
    );
  }

  // --- Vault Methods ---
  setupVault(password: string): boolean {
    console.log('Vault password set (mocked). Password:', password);
    this.hasVaultPassword.set(true);
    this.isVaultLocked.set(false);
    return true;
  }

  unlockVault(password: string): boolean {
    // Mock password check. In a real app, this would involve hashing.
    if (password) {
      console.log('Vault unlocked (mocked).');
      this.isVaultLocked.set(false);
      return true;
    }
    return false;
  }

  lockVault(): void {
    this.isVaultLocked.set(true);
  }
}
