import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BicicletasComponent } from './bicicletas.component';
import {  CandadosRoutes } from './bicicletas.routing';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import { BicicletasService } from '../../servicios/bicicletas.services';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {DataViewModule} from 'primeng/dataview';
import { CandadosService } from '../../servicios/candados.services';
import {DropdownModule} from 'primeng/dropdown';
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
    DataViewModule,
    DropdownModule

  ],
  declarations: [BicicletasComponent],
  providers:[BicicletasService,ConfirmationService,CandadosService]
})

export class BicicletasModule { }
