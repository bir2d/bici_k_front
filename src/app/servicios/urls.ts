


export class UrlServices {

    //servidor = "http://10.20.1.113"
    servidor = "http://localhost"
    autorizacion = this.servidor + ":6060";
    proxy = this.servidor + ":6060";

    login = this.autorizacion + "/oauth/token?grant_type=password"
    token = this.autorizacion + "/user"
    loginActive=this.autorizacion+'/uaa/active'

    candados=this.proxy+"/rest/candado"
    obtenerCandados=this.candados+"/listado"

    constructor() {

    }



}