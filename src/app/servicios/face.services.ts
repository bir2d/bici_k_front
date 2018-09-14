import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from './general/general.service';
import { UrlServices } from './urls';

@Injectable()
export class FaceServices {
    url = new UrlServices();
    formData = new FormData();

    constructor(private _generalServices: GeneralService) { }

    identificarEmpleado(imagen:String): Observable<any> {



        if (imagen != null) {
            this.formData.append('imagen', imagen.trim())
            //  console.log("mostrando datos de form ");
            console.log("valor de imagen en formulario ");
            console.log(this.formData.get('imagen'));
            return this._generalServices.getResourcesNA(this.url.identificarEmpleado, this.formData)
        }

        return null;

    }


}