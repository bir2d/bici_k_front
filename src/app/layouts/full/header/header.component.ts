import { Component } from '@angular/core';
import { Properties } from '../../../properties';
import { GeneralService } from '../../../servicios/general/general.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
    foto;
    properties= new Properties();
    strSesion = this.properties.strSesion;
    constructor(private generalService:GeneralService){
      this.foto= JSON.parse(localStorage.getItem(this.strSesion)).usuario.foto;
    }


    public logout() {
      this.generalService.logout();
      
      alert('Sesión cerrada');
    }
}
