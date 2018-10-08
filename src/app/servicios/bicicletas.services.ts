import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from './general/general.service';
import { UrlServices } from './urls';

@Injectable()
export class BicicletasService {

    url = new UrlServices();
    constructor(private _generalServices: GeneralService) { }

    obtenerBicicletas(): Observable<any> {
        return this._generalServices.getResources("get", this.url.obtenerBicicletas)
    }

    guardarBicicleta(bicicleta, imagen): Observable<any> {
        var formData = new FormData();
        if (imagen != null) formData.append('imagen', imagen[0]);
        formData.append('bicicletaStr', JSON.stringify(bicicleta));
        return this._generalServices.getResources("post", this.url.guardarBicicleta, formData)
    }

    eliminarBicicleta(bicicleta): Observable<any> {
        return this._generalServices.getResources("delete", this.url.eliminarBicicleta + bicicleta.id)
    
    }
   


}