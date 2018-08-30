import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EmpleadosComponent } from './empleados.component';
import { CandadosRoutes } from './empleados.routing';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { EmpleadosService } from '../../servicios/empleados.services';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule, Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {CheckboxModule} from 'primeng/checkbox';




@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(CandadosRoutes),
    PanelModule,
    TableModule,
    DialogModule,
    ButtonModule,
    DataViewModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule, 
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    CheckboxModule

  ],
  declarations: [EmpleadosComponent],
  providers: [EmpleadosService, MessageService, ConfirmationService]
})

export class EmpleadosModule { }
