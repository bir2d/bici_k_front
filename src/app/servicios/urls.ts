export class UrlServices {

    //servidor = "http://10.20.1.113"
                //https://192.168.237.130
    servidor = "https://192.168.0.41"
    autorizacion = this.servidor + ":9443";
    proxy = this.servidor + ":9443";

    login = this.autorizacion + "/oauth/token?grant_type=password"
    token = this.autorizacion + "/user"
    loginActive=this.autorizacion+'/uaa/active'

    candados=this.proxy+"/rest/candado" 
    empleados=this.proxy+"/rest/empleado"
    face= this.proxy+"/rest/face"

    obtenerEmpleados=this.empleados+""
    guardarEmpleados=this.empleados+""
    eliminarEmpleados= this.empleados+"/"


    identificarEmpleado= this.face+"/identificarB"


    obtenerCandados=this.candados+"/listado"
    obtenerCandadosSinAsignar=this.candados+"/listado/sinAsignar"
    guardarCandado=this.candados+"/guardar"
    eliminarCandado=this.candados+"/eliminar/"

    bicicletas=this.proxy+"/rest/bicicleta"
    obtenerBicicletas=this.bicicletas+""
    guardarBicicleta=this.bicicletas+"/guardar"
    eliminarBicicleta=this.bicicletas+"/eliminar/"

    reservas=this.proxy+"/rest/reserva"
    obtenerReservasPendientes=this.reservas+"/pendientes"
    terminarReserva=this.reservas+"/terminarReserva/"



    constructor() {

    }



}