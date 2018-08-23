import { Component, AfterViewInit, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { EmpleadosService } from '../../servicios/empleados.services';


@Component({
  selector: 'empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements AfterViewInit,OnInit{
    ngAfterViewInit(){}    

    cols = [];
    empleados;
    empleadoSeleccionado;
    displayDialog=false
  constructor(private _empleadoServices:EmpleadosService){

  }

  ngOnInit() {
    //this.carService.getCarsSmall().then(cars => this.cars = cars);

    this.cols = [
        { field: 'cedula', header: 'Cédula' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'cargo', header: 'Cargo' },
        { field: 'foto', header: 'foto' },
        {filed: 'email', header:'email'}
    ];

    this._empleadoServices.obtenerEmpleados()
      .subscribe((empleados: any[]) => {
        this.empleados = empleados;
        console.log(empleados);
        
      }, (err: any) => console.log("error")
      
      //this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar los movimientos.' })
      );
}
ver(empleado){
  this.empleadoSeleccionado=empleado;
  this.displayDialog=true;

}
}
