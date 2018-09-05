import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login.component';
import { StarterRoutes } from './login.routing';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { GeneralService } from '../servicios/general/general.service';
import { WebcamModule } from 'ngx-webcam';
import { FaceServices } from '../servicios/face.services';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    DemoMaterialModule,
    ButtonModule,
    FlexLayoutModule,
    RouterModule.forChild(StarterRoutes),
    WebcamModule

  ],
  declarations: [LoginComponent],
  providers: [GeneralService, FaceServices]
})

export class LoginModule { }
