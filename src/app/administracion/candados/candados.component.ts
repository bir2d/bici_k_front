import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { CandadosService } from '../../servicios/candados.services';
import { ConfirmationService } from 'primeng/api';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'candados',
  templateUrl: './candados.component.html',
  styleUrls: ['./candados.component.scss']
})
export class CandadosComponent implements AfterViewInit, OnInit {
  ngAfterViewInit() { }

  cols = [];
  candados;
  candadoSelecionado;
  displayDialog = false
  editar = false
  submitted = false
  constructor(private _candadoServices: CandadosService, private confirmationService: ConfirmationService, private messageService: MessageService) {

  }
  addSingle(error) {
    this.messageService.add({severity:'error', summary:'Conexión', detail:error});
}

  ngOnInit() {
    //this.carService.getCarsSmall().then(cars => this.cars = cars);

    this.cols = [
      { field: 'codigoBien', header: 'Código Bien' },
      { field: 'clave', header: 'Clave' },
      { field: 'descripcion', header: 'Descripción' }
      //,{ field: 'asignadoo', header: 'Asignado' }
    ];
    this.cargarCandados();

  }
  cargarCandados() {
    this._candadoServices.obtenerCandados()
      .subscribe((candados: any[]) => {
        this.candados = candados;
        console.log(candados);

      }, (err: any) => this.addSingle("No se puede conectar con el backend"));
  }
  ver(candado) {
    this.candadoSelecionado = candado;
    this.displayDialog = true;

  }
  nuevo() {
    this.candadoSelecionado = {};
    this.editar = true
  }

  guardar() {
    this._candadoServices.guardarCandado(this.candadoSelecionado)
      .subscribe((candados: any) => {
        this.editar = false;
        this.cargarCandados()
      }, (err: any) => console.log("error"));
  }

  editarCandado(candado) {
    this.candadoSelecionado = candado;
    this.editar = true
  }
  confirmarEliminar(candado) {
    this.candadoSelecionado = candado
    this.confirmationService.confirm({
      key: "confEliminar",
      message: '¿Está seguro que desea eliminar el bien ' + candado.codigoBien + '?',
      accept: () => {
        this._candadoServices.eliminarCandado(this.candadoSelecionado)
          .subscribe((candados: any) => {
          
            this.cargarCandados()
          }, (err: any) => console.log("error"));
      }
    });
  }

}
