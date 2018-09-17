import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from './general/general.service';
import { UrlServices } from './urls';

@Injectable()
export class ReservasService{

    url = new UrlServices();
    constructor(private _generalServices: GeneralService){ }

    obtenerReservasPendientes(): Observable<any> {
        return this._generalServices.getResources("get", this.url.obtenerReservasPendientes )
    }

    terminarReserva(reserva): Observable<any> {
        return this._generalServices.getResources("get", this.url.terminarReserva+reserva.id )
    }


}