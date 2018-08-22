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

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(CandadosRoutes),
    PanelModule,
    TableModule,
    DialogModule,
    ButtonModule

  ],
  declarations: [CandadosComponent],
  providers:[CandadosService]
})

export class CandadosModule { }
