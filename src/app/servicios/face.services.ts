import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from './general/general.service';
import { UrlServices } from './urls';

@Injectable()
export class FaceServices {
    url = new UrlServices();
    

    constructor(private _generalServices: GeneralService) { }

    identificarEmpleado(imagen){

       let  formData = new FormData();
    
        if (imagen != null && imagen!="") {
            formData.append('imagen', imagen)
         
            console.log(formData.get("imagen"))
             this._generalServices.loginFace( this.url.identificarEmpleado, formData)
        }      
      
        
    }


}