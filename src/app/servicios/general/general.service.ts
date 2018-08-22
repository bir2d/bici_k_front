import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate } from '@angular/router';
//import { Cookie } from 'ng2-cookies'; 
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { UrlServices } from '../urls'
import { Properties } from '../../properties';

//import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Injectable()
export class GeneralService  implements CanActivate{
    //@BlockUI() blockUI: NgBlockUI;
    url = new UrlServices();
    properties= new Properties();
    strSesion = this.properties.strSesion;
    key = "HackersSeeIT2";
    constructor(private _http: Http, private _router: Router) { }


    canActivate(): boolean {
       
        
        if (localStorage.getItem(this.strSesion)==null) {
          this._router.navigate(['login']);
          return false;
        }
        return true;
      }

    autenticar(username = null, password = null): Observable<any> {
        let params = new URLSearchParams();
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa("bicik:bicik"))
        let options = new RequestOptions({ headers: headers });
        
       return this._http.post(this.url.login + '&username=' + username + '&password=' + password, params.toString(), options)
            .map(res => {
                    let token=res.json()
                    console.log(token);
                    
                    let headersToken = new Headers();
                    headersToken.append('Authorization', 'Bearer ' + token.access_token)
                    let optionsToken = new RequestOptions({ headers: headersToken });
                    this._http.get(this.url.token, optionsToken)
                        .map(res => res.json())
                        .subscribe(
                            usuario => {                               

                                let usuarioLocalStorage = { "token": token, "usuario": usuario.principal }
                                localStorage.setItem(this.strSesion,JSON.stringify(usuarioLocalStorage) );
                                window.open("/", "_self")
                                return false;
                            },
                            err => {
                                //console.log("error",err.status)
                                if (err.status == 401) {
                                    return false;
                                    
                                  
                                }
                            }
                        );
                },
                err => {
                   // this.stopBlock()
                    if (err.status == 401) {
                        return false;  
                    }
                }
            );

           
    }

 
   

    logout() {
        localStorage.removeItem(this.strSesion);
        localStorage.removeItem("nombres");
        this._router.navigate(['/authentication/login']);
    }


    getResources(tipo, url, body = null): Observable<any> {
        //this.blockUI.start('Loading...');
        let result;
        if (localStorage.getItem(this.strSesion) != null) {
            let headersToken = new Headers();
            var decrypted =localStorage.getItem(this.strSesion);
            let token = JSON.parse(decrypted)
            headersToken.append('Authorization', 'Bearer ' + token.token.access_token)
            let optionsToken = new RequestOptions({ headers: headersToken });
            if (tipo == "get") {
                return this._http["get"](url, optionsToken)
                    .map((res: Response) => {
                        //this.blockUI.stop();
                        result = res.json();
                        return result;
                    }).catch(this.handleError());
            } else if (tipo == "post") {
                
                if(Array.isArray(body)){
                    body.forEach(element => {
                        if(typeof element == 'object'){
                            element["usuarioregistroid"]=localStorage.getItem("username")
                            element["fecharegistro"]=new Date()
                            
                        }
                    });

                }else if(typeof body == 'object'){
                    body["usuarioregistroid"]=localStorage.getItem("username")
                    body["fecharegistro"]=new Date()
                    
                }
                
                
                return this._http["post"](url, body, optionsToken)
                    .map((res: Response) => {
                        //this.blockUI.stop();
                        result = res.json();
                        return result;
                    }).catch(this.handleError());
            } else if (tipo == "getFile") {
                optionsToken = new RequestOptions({ headers: headersToken, responseType: ResponseContentType.Blob });
                return this._http["get"](url, optionsToken)
                    .map((res: Response) => {
                        //this.blockUI.stop();
                        return res;
                    }).catch(this.handleError());
            } else if (tipo == "postFile") {
                optionsToken = new RequestOptions({ headers: headersToken, responseType: ResponseContentType.Blob });
                return this._http["post"](url, body, optionsToken)
                    .map((res: Response) => {
                        //this.blockUI.stop();
                        return res;
                    }).catch(this.handleError());
            } else if (tipo == "delete") {
                return this._http["delete"](url, optionsToken)
                    .map((res: Response) => {
                        //this.blockUI.stop();
                        //result = res.json();
                        return result;
                    }).catch(this.handleError());
            }

        }
        return null;
    }

    stopBlock() {
       // this.blockUI.stop();
    }
    private handleError() {
        return (res: Response) => {
           // this.blockUI.stop();
            let errMessage: any;
            try {
                console.log(res);
                if (res.status == 412) {
                    errMessage = { 'status': res.status, 'message': res.text() };
                } else if (res.status == 401) {
                    this._router.navigate(['/login']);
                }
                else {
                    errMessage = res.json();
                }

            } catch (err) {
                errMessage = res.statusText;
            }
            // Security errors
            // this.utilService.stopProcess();
            return Observable.throw(errMessage);
        };
    }

}