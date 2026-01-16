import { Component, ChangeDetectionStrategy, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloudProvider, AiProvider } from '../../types';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class LoginModalComponent {
  visible = input(false);
  provider = input<CloudProvider | AiProvider | null>(null);
  loginSuccess = output<string>();
  close = output<void>();

  constructor() {
    effect((onCleanup) => {
      if (this.visible() && this.provider()) {
        const timer = setTimeout(() => {
          this.loginSuccess.emit(this.provider()!.name);
        }, 2000);
        onCleanup(() => clearTimeout(timer));
      }
    });
  }

  closeModal() {
    this.close.emit();
  }
}
