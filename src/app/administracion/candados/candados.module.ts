import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CandadosComponent } from './candados.component';
import {  CandadosRoutes } from './candados.routing';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import { CandadosService } from '../../servicios/candados.services';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {ToastModule, Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(CandadosRoutes),
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
  declarations: [CandadosComponent],
  providers:[CandadosService,ConfirmationService, MessageService]
})

export class CandadosModule { }
