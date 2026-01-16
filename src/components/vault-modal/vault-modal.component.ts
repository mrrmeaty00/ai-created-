import { Component, ChangeDetectionStrategy, input, output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileSystemService } from '../../services/file-system.service';

@Component({
  selector: 'app-vault-modal',
  templateUrl: './vault-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
})
export class VaultModalComponent {
  fsService = inject(FileSystemService);

  visible = input(false);
  close = output<void>();
  unlocked = output<void>();

  hasPassword = this.fsService.hasVaultPassword;
  
  // For setup
  newPassword = signal('');
  confirmPassword = signal('');
  
  // For unlocking
  password = signal('');
  error = signal('');
  
  setupVault() {
    this.error.set('');
    if (this.newPassword().length < 8) {
        this.error.set('Password must be at least 8 characters long.');
        return;
    }
    if (this.newPassword() !== this.confirmPassword()) {
        this.error.set('Passwords do not match.');
        return;
    }
    if (this.fsService.setupVault(this.newPassword())) {
        this.unlocked.emit();
        this.reset();
    }
  }
  
  unlockVault() {
    this.error.set('');
    if (this.fsService.unlockVault(this.password())) {
        this.unlocked.emit();
        this.reset();
    } else {
        this.error.set('Incorrect password.');
    }
  }

  closeModal() {
    this.reset();
    this.close.emit();
  }

  private reset() {
    this.newPassword.set('');
    this.confirmPassword.set('');
    this.password.set('');
    this.error.set('');
  }
}
