import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from './general/general.service';
import { UrlServices } from './urls';

@Injectable()
export class EmpleadosService{

    url = new UrlServices();
    constructor(private _generalServices: GeneralService){ }

    obtenerEmpleados(): Observable<any> {
        return this._generalServices.getResources("get", this.url.obtenerEmpleados )
    }

    guardarEmpleado(empleado, imagen): Observable<any> {
        var formData = new FormData();
        if (imagen != null) formData.append('imagen', imagen[0]);
        formData.append('empleadoStr', JSON.stringify(empleado));
        return this._generalServices.getResources("post", this.url.guardarEmpleados, formData)
    }


}