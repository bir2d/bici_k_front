import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReservasComponent } from './reservas.component';
import { ReservasRoutes } from './reservas.routing';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import { ReservasService } from '../../servicios/reservas.services';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {ToastModule, Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {DatePipe} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(ReservasRoutes),
    PanelModule,
    TableModule,
    DialogModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ToastModule

  ],
  declarations: [ReservasComponent],
  providers:[ReservasService,ConfirmationService, MessageService,DatePipe]
})

export class ReservasModule { }
