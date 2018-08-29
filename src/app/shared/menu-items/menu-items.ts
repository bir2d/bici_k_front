import { Injectable } from '@angular/core';

export interface Menu {
  state: string[];
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
    {state: ['/', 'starter'] , name: 'Inicio', type: 'link', icon: 'av_timer' }, 
    {state: ['/','administracion',"bicicletas"], name: 'Bicicletas', type: 'link', icon: 'directions_bike' },
    {state: ['/','administracion',"candados"], name: 'Candados', type: 'link', icon: 'https' },
    {state: ['/','administracion',"empleados"], type: 'link', name: 'Empleados', icon: 'account_box'},
]; 

@Injectable()

export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }

}
