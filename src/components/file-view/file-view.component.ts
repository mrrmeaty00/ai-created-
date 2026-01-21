import { Component, ChangeDetectionStrategy, signal, input, effect, inject, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileItem } from '../../types';
import { FileSystemService } from '../../services/file-system.service';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class FileViewComponent {
  fsService = inject(FileSystemService);

  currentPath = input.required<string[]>();
  folderOpened = output<string>();
  previewFile = output<FileItem>();
  contextMenu = output<{ mouseEvent: MouseEvent, file: FileItem | null }>();

  files = computed(() => this.fsService.getContents(this.currentPath()));
  isCloudPath = computed(() => this.currentPath()[0] === '_cloud_');

  sortColumn = signal('name');
  sortDirection = signal<'asc' | 'desc'>('asc');

  // Preview Logic
  hoveredFile = signal<FileItem | null>(null);
  selectedFile = signal<FileItem | null>(null);
  mousePosition = signal<{x: number, y: number}>({x: 0, y: 0});
  private hoverTimeout: any;
  
  onDoubleClick(file: FileItem) {
    if (file.type === 'FOLDER') {
      this.folderOpened.emit(file.name);
    }
  }

  onSingleClick(file: FileItem) {
    this.selectedFile.set(file);
  }

  onContextMenu(event: MouseEvent, file: FileItem | null) {
    if (file) {
        this.selectedFile.set(file);
    }
    this.contextMenu.emit({ mouseEvent: event, file });
  }

  onMouseEnter(event: MouseEvent, file: FileItem) {
    this.updateMousePosition(event);
    
    // Clear any pending timer
    if (this.hoverTimeout) {
        clearTimeout(this.hoverTimeout);
    }

    // Start delay timer (1 second)
    this.hoverTimeout = setTimeout(() => {
        this.hoveredFile.set(file);
    }, 1000);
  }

  onMouseLeave() {
    // Cancel timer if mouse leaves before timeout
    if (this.hoverTimeout) {
        clearTimeout(this.hoverTimeout);
    }
    this.hoveredFile.set(null);
  }

  onMouseMove(event: MouseEvent) {
    this.updateMousePosition(event);
  }

  updateMousePosition(event: MouseEvent) {
    // Pass raw coordinates; CSS will handle the offset to show "above"
    this.mousePosition.set({ x: event.clientX, y: event.clientY });
  }

  onPreviewClick(event: MouseEvent, file: FileItem) {
    event.stopPropagation();
    this.previewFile.emit(file);
  }

  changeSort(column: string) {
    if (this.sortColumn() === column) {
      this.sortDirection.update(dir => dir === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
    // Add sorting logic here if needed, for now it's just visual
  }
}