import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from './general/general.service';
import { UrlServices } from './urls';

@Injectable()
export class FaceServices {
    url = new UrlServices();
    

    constructor(private _generalServices: GeneralService) { }

    identificarEmpleado(imagen): Observable<any>{
       let  formData = new FormData();    
        if (imagen != null && imagen!="") {
            formData.append('imagen', imagen)
            return this._generalServices.loginFace( this.url.identificarEmpleado, formData)
        }      
      
        
    }


}