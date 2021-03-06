import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule} from './demo-material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { BasicComponent } from './layouts/basic/basic.component';
import { GeneralService } from './servicios/general/general.service';
import { HttpModule } from '../../node_modules/@angular/http';
import {WebcamModule} from 'ngx-webcam';
import {enableProdMode} from '@angular/core';


@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent ,
    BasicComponent 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,  
    HttpClientModule,
    HttpModule,
    FormsModule,
    BrowserModule,
    SharedModule,  
    RouterModule.forRoot(AppRoutes) ,
    WebcamModule,
    HttpClientModule
  ],
  providers: [
    GeneralService,
    
  {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
