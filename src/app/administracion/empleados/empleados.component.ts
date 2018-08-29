import { Component, AfterViewInit, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { EmpleadosService } from '../../servicios/empleados.services';
import {MessageService} from 'primeng/api';



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
  constructor(private _empleadoServices:EmpleadosService, private messageService: MessageService){
   
  }

  addSingle(error) {
    this.messageService.add({severity:'error', summary:'Conexión', detail:error});
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
        
      }, (err: any) => this.addSingle("No se puede conectar con el backend")
    
      );
}
ver(empleado){
  this.empleadoSeleccionado=empleado;
  this.displayDialog=true;

}
}
