import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EmpleadosComponent } from './empleados.component';
import {  CandadosRoutes } from './empleados.routing';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import { EmpleadosService } from '../../servicios/empleados.services';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DataViewModule} from 'primeng/dataview';
import {ToastModule} from 'primeng/toast';
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
    DataViewModule,
    ToastModule

  ],
  declarations: [EmpleadosComponent],
  providers:[EmpleadosService, MessageService]
})

export class EmpleadosModule { }
