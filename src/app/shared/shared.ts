import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { RowActionComponent } from './components/row-action/row-action.component';
import { SvgIconDirective } from './directives/svg-icon.directive';

@NgModule({
  providers: [ConfirmationService, DatePipe],
  imports: [
    RowActionComponent,
    SvgIconDirective,
    CommonModule,
    InputTextModule,
    AvatarModule,
    PaginatorModule,
    TableModule,
    ConfirmPopupModule,
    FloatLabelModule,
    InputIconModule,
    IconFieldModule,
    SelectModule,
    PasswordModule,
    NgClass,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    DatePickerModule,
    MultiSelectModule,
    EditorModule,
    ToastModule,
    MessageModule,
    ConfirmDialogModule,
  ],
  exports: [
    RowActionComponent,
    SvgIconDirective,
    CommonModule,
    ButtonModule,
    InputTextModule,
    AvatarModule,
    PaginatorModule,
    TableModule,
    ConfirmPopupModule,
    FloatLabelModule,
    InputIconModule,
    IconFieldModule,
    SelectModule,
    PasswordModule,
    NgClass,
    ReactiveFormsModule,
    DialogModule,
    DatePickerModule,
    MultiSelectModule,
    EditorModule,
    ToastModule,
    MessageModule,
    ConfirmDialogModule,
  ],
})
export class SharedModule {}
