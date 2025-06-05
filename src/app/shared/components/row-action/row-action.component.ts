import { Component, inject, output } from '@angular/core';
import { SharedModule } from '@shared/shared';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-row-action',
  imports: [SharedModule, ConfirmDialogModule],
  templateUrl: './row-action.component.html',
})
export class RowActionComponent {
  onDelete = output<Event>();
  onEdit = output<void>();

  handleDelete(event: Event) {
    this.onDelete.emit(event);
  }

  handleEdit() {
    this.onEdit.emit();
  }
}
