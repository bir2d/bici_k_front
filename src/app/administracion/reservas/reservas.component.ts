import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { ReservasService } from '../../servicios/reservas.services';
import { ConfirmationService } from 'primeng/api';
import {MessageService} from 'primeng/api';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent implements AfterViewInit, OnInit {
  ngAfterViewInit() { }

  cols = [];
  reservas;
  candadoSelecionado;
  displayDialog = false
  editar = false
  submitted = false
  constructor(private _candadoServices: ReservasService, 
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private datePipe: DatePipe) {

  }
  addSingle(error) {
    this.messageService.add({severity:'error', summary:'Conexión', detail:error});
}

  ngOnInit() {
    //this.carService.getCarsSmall().then(cars => this.cars = cars);

    this.cols = [
      { field: 'empleadoNombre', header: 'Krugeriano' },
      { field: 'bicicletaDescripcion', header: 'Bicicleta' },
      { field: 'inicioUso', header: 'Inicio Uso' },
      { field: 'tiempoUso', header: 'Tiempo Estimado Uso' },
      { field: 'finEstimado', header: 'Tiempo Estimado Fin Uso' }
      //,{ field: 'asignadoo', header: 'Asignado' }
    ];
    this.cargarReservas();

  }
  cargarReservas() {
    
    this._candadoServices.obtenerReservasPendientes()
      .subscribe((reservas: any[]) => {
        reservas.forEach(x => {
          x.empleadoNombre=x.empleado.nombre
          x.bicicletaDescripcion=x.bicicleta.codigoBien
          let fin = new Date(x.inicioUso) // your date object
          fin.setMinutes(fin.getMinutes() + x.tiempoUso)
          x.inicioUso=this.datePipe.transform(new Date(x.inicioUso),"yyyy-MM-dd HH:mm");
          x.finEstimado=this.datePipe.transform(fin,"yyyy-MM-dd HH:mm");
        });
        this.reservas = reservas;
        

      }, (err: any) => this.addSingle("No se puede conectar con el backend"));
  }
  
  confirmarDevolucion(reserva) {
    this.candadoSelecionado = reserva
    this.confirmationService.confirm({
      key: "confEliminar",
      message: '¿Está seguro que desea devolver la bicicleta <strong>' + reserva.bicicletaDescripcion + '</strong> reservada por el krugeriano <strong>'+ reserva.empleadoNombre+'</strong>?',
      accept: () => {
        this._candadoServices.terminarReserva(this.candadoSelecionado)
          .subscribe((reservas: any) => {
          
            this.cargarReservas()
          }, (err: any) => console.log("error"));
      }
    });
  }

}
