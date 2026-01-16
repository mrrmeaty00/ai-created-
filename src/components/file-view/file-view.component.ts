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
  contextMenu = output<{ mouseEvent: MouseEvent, file: FileItem | null }>();

  files = computed(() => this.fsService.getContents(this.currentPath()));
  isCloudPath = computed(() => this.currentPath()[0] === '_cloud_');

  sortColumn = signal('name');
  sortDirection = signal<'asc' | 'desc'>('asc');
  
  onDoubleClick(file: FileItem) {
    if (file.type === 'FOLDER') {
      this.folderOpened.emit(file.name);
    }
  }

  onContextMenu(event: MouseEvent, file: FileItem | null) {
    this.contextMenu.emit({ mouseEvent: event, file });
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
