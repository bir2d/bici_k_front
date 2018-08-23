import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from './general/general.service';
import { UrlServices } from './urls';

@Injectable()
export class CandadosService{

    url = new UrlServices();
    constructor(private _generalServices: GeneralService){ }

    obtenerCandados(): Observable<any> {
        return this._generalServices.getResources("get", this.url.obtenerCandados )
    }

    obtenerCandadosSinAsignar(): Observable<any> {
        return this._generalServices.getResources("get", this.url.obtenerCandadosSinAsignar )
    }

    guardarCandado(candado): Observable<any> {
        return this._generalServices.getResources("post", this.url.guardarCandado,candado )
    }

    eliminarCandado(candado): Observable<any> {
        return this._generalServices.getResources("delete", this.url.eliminarCandado+candado.id )
    }


}