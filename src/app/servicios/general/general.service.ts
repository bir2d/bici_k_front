import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate } from '@angular/router';
//import { Cookie } from 'ng2-cookies'; 
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { UrlServices } from '../urls'
import { Properties } from '../../properties';
import { APIResponse } from '../../interfaces/api-response.interface';

//import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Injectable()
export class GeneralService implements CanActivate {
    //@BlockUI() blockUI: NgBlockUI;
    url = new UrlServices();
    properties = new Properties();
    strSesion = this.properties.strSesion;
    key = "HackersSeeIT2";
    constructor(private _http: Http, private _router: Router, private http: HttpClient) { }


    canActivate(): boolean {


        if (localStorage.getItem(this.strSesion) == null) {
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
                let token = res.json()
                console.log(token);

                let headersToken = new Headers();
                headersToken.append('Authorization', 'Bearer ' + token.access_token)
                let optionsToken = new RequestOptions({ headers: headersToken });
                this._http.get(this.url.token, optionsToken)
                    .map(res => res.json())
                    .subscribe(
                        usuario => {

                            let usuarioLocalStorage = { "token": token, "usuario": usuario.principal }
                            localStorage.setItem(this.strSesion, JSON.stringify(usuarioLocalStorage));
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

        this._router.navigate(['login']);
    }


    getResources(tipo, url, body = null): Observable<any> {

        //! this is very important
        //? question
        // TODO esto es lo primero a hacer 


        //this.blockUI.start('Loading...');
        let result;
        if (localStorage.getItem(this.strSesion) != null) {
            let headersToken = new Headers();
            var decrypted = localStorage.getItem(this.strSesion);
            let token = JSON.parse(decrypted)
            headersToken.append('Authorization', 'Bearer ' + token.token.access_token)
            let optionsToken = new RequestOptions({ headers: headersToken });
            if (tipo == "get") {
                return this._http["get"](url, optionsToken)
                    .map((res: Response) => {
         
                                result = res.json();
   
                        return result;
                    }).catch(this.handleError());
            } else if (tipo == "post") {
                console.log("contenido de body:" + typeof body);



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
                        if (res.status == 200) {
                            //      console.log(res);
                        }

                        return res;
                    }).catch(this.handleError());
            }

        }
    }

    loginFace(url, body): Observable<any> {
        const httpOptions = {};
        
        return this.http.post(url, body, httpOptions)
            .map((res: Response) => {

                return res;
            }).catch(this.handleError());
    }

    getResourcesNA(url, body = null): Observable<any> {
        
        this.http.post(url, body, {
            headers: new HttpHeaders()
              .set('Content-Type', 'application/x-www-form-urlencoded')
          })
            .subscribe(
                data => console.log('success', data),
                error => console.log('oops', error)
            );
        return null
    }





    stopBlock() {
        // this.blockUI.stop();
    }
    private handleError() {
        return (res: Response) => {

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
            return Observable.throw(errMessage);
        };
    }

}