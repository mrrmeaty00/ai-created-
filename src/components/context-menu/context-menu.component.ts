import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileItem } from '../../types';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class ContextMenuComponent {
  x = input(0);
  y = input(0);
  visible = input(false);
  file = input<FileItem | null>(null);
  action = output<string>();

  emitAction(actionName: string, event: MouseEvent) {
    event.stopPropagation();
    this.action.emit(actionName);
  }
}
