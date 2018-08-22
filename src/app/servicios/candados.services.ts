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


}