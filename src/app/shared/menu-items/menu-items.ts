import { Injectable } from '@angular/core';

export interface Menu {
  state: string[];
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
    {state: ['/','administracion',"bicicletas"], name: 'Bicicletas', type: 'link', icon: 'directions_bike' },
    {state: ['/','administracion',"candados"], name: 'Candados', type: 'link', icon: 'https' },
    {state: ['/','administracion',"empleados"], type: 'link', name: 'Krugerianos', icon: 'account_box'},
    {state: ['/','administracion',"reservas"], type: 'link', name: 'Reservas', icon: 'access_time'},
]; 

@Injectable()

export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }

}
