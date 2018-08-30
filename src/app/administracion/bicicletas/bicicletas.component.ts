import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { BicicletasService } from '../../servicios/bicicletas.services';
import { ConfirmationService } from 'primeng/api';
import { CandadosService } from '../../servicios/candados.services';
import {SelectItem} from 'primeng/api';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'bicicletas',
  templateUrl: './bicicletas.component.html',
  styleUrls: ['./bicicletas.component.scss']
})
export class BicicletasComponent implements AfterViewInit, OnInit {
  ngAfterViewInit() { }

  cols = [];
  bicicletas;
  bicicletaSelecionado;
  displayDialog = false
  editar = false
  submitted = false
  documento;
  candadosItem : SelectItem[];
  constructor(private _bicicletaServices: BicicletasService, 
    private _candadoServices: CandadosService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {

  }
  addSingle(error) {
    this.messageService.add({severity:'error', summary:'Conexión', detail:error});
}

  ngOnInit() {

    this.cols = [
      { field: 'codigoBien', header: 'Código Bien' },
      { field: 'estado', header: 'Estado' },
      { field: 'descripcion', header: 'Descripción' }
     
    ];
    this.cargarBicicletas();
    this.cargarCandaddos();

  }
  cargarCandaddos(){
    this._candadoServices.obtenerCandadosSinAsignar()
    .subscribe((candados: any[]) => {
      this.candadosItem=[{label:'No asignar candado', value:null}]
      candados.forEach(x => {
        this.candadosItem.push({label:x.descripcion, value:x.id})
      });

    }, (err: any) => this.addSingle("No se puede conectar con el backend"));
  }
  cargarBicicletas() {
    this._bicicletaServices.obtenerBicicletas()
      .subscribe((bicicletas: any[]) => {
        this.bicicletas = bicicletas;
      }, (err: any) => console.log("error"));
  }
  ver(bicicleta) {
    this.bicicletaSelecionado = bicicleta;
    this.displayDialog = true;

  }
  nuevo() {
    this.bicicletaSelecionado = {};
    this.editar = true
  }

  guardar() {
    if(this.bicicletaSelecionado.id==null)this.bicicletaSelecionado["disponibilidad"]="Disponible"
    this._bicicletaServices.guardarBicicleta(this.bicicletaSelecionado,this.documento)
      .subscribe((bicicletas: any) => {
        this.editar = false;
        this.cargarBicicletas()
      }, (err: any) => console.log("error"));
  }

  editarBicicleta(bicicleta) {
    this.bicicletaSelecionado = bicicleta;
    this.editar = true
  }
  confirmarEliminar(bicicleta) {
    this.bicicletaSelecionado = bicicleta
    this.confirmationService.confirm({
      
      key: "confEliminarBici",
      message: '¿Está seguro que desea eliminar el bien ' + bicicleta.codigoBien + '?',
      accept: () => {
        this._bicicletaServices.eliminarBicicleta(this.bicicletaSelecionado)
          .subscribe((bicicletas: any) => {
          
            this.cargarBicicletas()
          }, (err: any) => console.log("error"));
      }
    });
  }

  fileChangeEvent(event) {
    let e = event.srcElement ? event.srcElement : event.target;
    this.documento = (e.files);
  }

}
