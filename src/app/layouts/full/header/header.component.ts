import { Component } from '@angular/core';
import { Properties } from '../../../properties';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
    foto;
    properties= new Properties();
    strSesion = this.properties.strSesion;
    constructor(){
      this.foto= JSON.parse(localStorage.getItem(this.strSesion)).usuario.foto;
    }
}
