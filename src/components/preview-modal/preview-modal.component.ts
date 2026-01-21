import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileItem } from '../../types';

@Component({
  selector: 'app-preview-modal',
  templateUrl: './preview-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class PreviewModalComponent {
  visible = input(false);
  file = input<FileItem | null>(null);
  close = output<void>();

  onClose() {
    this.close.emit();
  }
}