import { Component, AfterViewInit, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { CandadosService } from '../../servicios/candados.services';


@Component({
  selector: 'candados',
  templateUrl: './candados.component.html',
  styleUrls: ['./candados.component.scss']
})
export class CandadosComponent implements AfterViewInit,OnInit{
    ngAfterViewInit(){}    

    cols = [];
    candados;
    candadoSelecionado;
    displayDialog=false
  constructor(private _candadoServices:CandadosService){

  }

  ngOnInit() {
    //this.carService.getCarsSmall().then(cars => this.cars = cars);

    this.cols = [
        { field: 'codigoBien', header: 'Código Bien' },
        { field: 'descripcion', header: 'Descripción' },
        { field: 'clave', header: 'Clave' },
        { field: 'asignadoo', header: 'Asignado' }
    ];

    this._candadoServices.obtenerCandados()
      .subscribe((candados: any[]) => {
        this.candados = candados;
        console.log(candados);
        
      }, (err: any) => console.log("error")
      
      //this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar los movimientos.' })
      );
}
ver(candado){
  this.candadoSelecionado=candado;
  this.displayDialog=true;

}
}
