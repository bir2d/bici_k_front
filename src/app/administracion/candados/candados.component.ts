import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { CandadosService } from '../../servicios/candados.services';


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
  constructor(private _candadoServices: CandadosService) {

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

      }, (err: any) => console.log("error"));
  }
  ver(candado) {
    this.candadoSelecionado = candado;
    this.displayDialog = true;

  }
  nuevo() {
    this.candadoSelecionado = { };
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
    this.candadoSelecionado =candado;
    this.editar = true
  }

}
