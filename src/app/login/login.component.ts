import { Component, AfterViewInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { GeneralService } from '../servicios/general/general.service';

@Component({
  selector: 'starter',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit{
    ngAfterViewInit(){}    

    usuario;
    password;

    constructor(public _generalServices: GeneralService){

    }

    login(){
      
      this._generalServices.autenticar("ricardo","ricardo").subscribe((respuesta) => {
        console.log(respuesta);
        
      }, (err: any) => console.log(err));
    }
}
