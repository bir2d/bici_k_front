import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { EmpleadosService } from '../../servicios/empleados.services';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';



@Component({
  selector: 'empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements AfterViewInit, OnInit {
  ngAfterViewInit() { }

  cols = [];
  empleados;
  empleadoSeleccionado;
  displayDialog = false
  editar = false
  submitted = false
  documento;
  constructor(private _empleadoServices: EmpleadosService, private messageService: MessageService, private confirmationService: ConfirmationService, ) {

  }

  addSingle(error) {
    this.messageService.add({ severity: 'error', summary: 'Conexión', detail: error });
  }

  ngOnInit() {
    //this.carService.getCarsSmall().then(cars => this.cars = cars);

    this.cols = [
      { field: 'cedula', header: 'Cédula' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'cargo', header: 'Cargo' },
      { field: 'foto', header: 'Foto' },
      { filed: 'email', header: 'Email' },
      { filed: 'sistema', header: 'Usuario sistema' },
      { filed: 'enabled', header: 'Enabled' }
    ];

    this._empleadoServices.obtenerEmpleados()
      .subscribe((empleados: any[]) => {
        this.empleados = empleados;


      }, (err: any) => this.addSingle("No se puede conectar con el backend")

      );
  }
  ver(empleado) {
    this.empleadoSeleccionado = empleado;
    this.displayDialog = true;

  }
  editarEmpleado(empleado) {
    this.empleadoSeleccionado = empleado;
    this.editar = true
  }

  cargarEmpleados() {
    this._empleadoServices.obtenerEmpleados()
      .subscribe((empleados: any[]) => {
        this.empleados = empleados;
      }, (err: any) => console.log("error"));
  }

  guardar() {
    this._empleadoServices.guardarEmpleado(this.empleadoSeleccionado,this.documento)
      .subscribe((empleados: any) => {
        this.editar = false;
        this.cargarEmpleados();
      }, (err: any) => console.log(err));
  }

  fileChangeEvent(event) {
    let e = event.srcElement ? event.srcElement : event.target;
    this.documento = (e.files);
  }

  confirmarEliminar(empleado) {
    this.empleadoSeleccionado = empleado
    this.confirmationService.confirm({
      
      key: "confEliminarEmp",
      message: '¿Está seguro que desea eliminar el empleado ' + empleado.cedula + '?',
      accept: () => {
        this._empleadoServices.eliminarEmpleado(this.empleadoSeleccionado)
          .subscribe((empleados: any) => {
          
            this.cargarEmpleados()
          }, (err: any) => console.log("error"));
      }
    });
  }


  nuevo() {
    this.empleadoSeleccionado = {};
    this.editar = true;
   
  }
}
