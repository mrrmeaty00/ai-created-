export type FileType = 'FOLDER' | 'TYPESCRIPT FILE' | 'CSS FILE' | 'IMAGE' | 'VIDEO' | 'ZIP';

export interface FileItem {
  name: string;
  type: FileType;
  dateModified: string;
  size: string;
  icon: string;
  children?: FileItem[];
  syncStatus?: 'synced' | 'syncing' | 'error';
  content?: string;
  previewUrl?: string;
}

export interface Drive {
    name: string;
    total: number;
    used: number;
    icon: string;
}

export interface AiProvider {
    name: string;
    models: string[];
    icon: string;
    loggedIn: boolean;
}

export interface CloudProvider {
    name: string;
    icon: string;
    loggedIn: boolean;
}