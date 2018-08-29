import { ChangeDetectorRef, Component, NgZone, OnDestroy, ViewChild, HostListener, Directive, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { Properties } from '../../../properties';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent {
  mobileQuery: MediaQueryList;

  properties= new Properties();
  strSesion = this.properties.strSesion;
  nombre;
  foto;
  
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public menuItems: MenuItems) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.nombre= JSON.parse(localStorage.getItem(this.strSesion)).usuario.nombre
    this.foto= JSON.parse(localStorage.getItem(this.strSesion)).usuario.foto;
    
  }

  ngOnDestroy(): void {
   
  }
 
}