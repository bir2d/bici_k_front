


export class UrlServices {

    //servidor = "http://10.20.1.113"
    servidor = "http://localhost"
    autorizacion = this.servidor + ":6060";
    proxy = this.servidor + ":6060";

    login = this.autorizacion + "/oauth/token?grant_type=password"
    token = this.autorizacion + "/user"
    loginActive=this.autorizacion+'/uaa/active'

    candados=this.proxy+"/rest/candado"

    
    empleados=this.proxy+"/rest/empleado"

    obtenerEmpleados=this.empleados+""
    guardarEmpleados=this.empleados+""



    obtenerCandados=this.candados+"/listado"
    obtenerCandadosSinAsignar=this.candados+"/listado/sinAsignar"
    guardarCandado=this.candados+"/guardar"
    eliminarCandado=this.candados+"/eliminar/"

    bicicletas=this.proxy+"/rest/bicicleta"
    obtenerBicicletas=this.bicicletas+""
    guardarBicicleta=this.bicicletas+"/guardar"
    eliminarBicicleta=this.bicicletas+"/eliminar/"

    constructor() {

    }



}