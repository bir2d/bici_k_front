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


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(CandadosRoutes),
    PanelModule,
    TableModule,
    DialogModule,
    ButtonModule,
    DataViewModule

  ],
  declarations: [EmpleadosComponent],
  providers:[EmpleadosService]
})

export class EmpleadosModule { }
